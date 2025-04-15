import "reflect-metadata";
import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import Redis from "ioredis";
import cors from "cors";
import session from "express-session";
import { RedisStore } from "connect-redis";
import { mongodb } from "./config/mongodb";
import bodyParser from "body-parser";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import { UserResolver } from "./resolver/user";
import { MyContext } from "./types/context";

const main = async () => {
  mongodb();
  const app: Application = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const redis = new Redis();
  redis.on("connect", () => {
    console.log("Connected to Redis");
  });
  redis.on("error", (error) => {
    console.error("Error connecting to Redis: ", error);
  });

  const redisStore = new RedisStore({
    client: redis,
    prefix: "lab3:",
    disableTouch: true,
  });

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3002",
        "http://localhost:4001",
        "http://localhost:4001/graphql",
      ],
      credentials: true,
    }),
  );

  app.set("trust proxy", 1);
  app.use(
    session({
      name: process.env.COOKIE_NAME,
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        domain: "localhost",
      },
      saveUninitialized: false,
      resave: false,
      secret: process.env.SESSION_SECRET || "rocket",
    }),
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    cache: "bounded",
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => ({
        req,
        res,
        redis,
      }),
    }) as any,
  );

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
