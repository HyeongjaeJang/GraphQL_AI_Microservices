import "reflect-metadata";
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import { RedisStore } from "connect-redis";
import Redis from "ioredis";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import bodyParser from "body-parser";
import cors from "cors";
import { PostResolver } from "./resolver/post";
import { buildSchema } from "type-graphql";
import { mongodb } from "./config/mongodb";
import { HelpResolver } from "./resolver/help";
import { AIResolver } from "./resolver/ai";

const main = async () => {
  mongodb();

  const app = express();
  app.use(cookieParser());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3002",
        "http://localhost:4000",
      ],
      credentials: true,
    }),
  );

  app.set("trust proxy", 1);

  const redis = new Redis();
  const redisStore = new RedisStore({
    client: redis,
    prefix: "lab3:",
    disableTouch: true,
  });

  app.use(
    session({
      name: "lab",
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
      saveUninitialized: false,
      resave: false,
      secret: process.env.SESSION_SECRET || "rocket",
    }),
  );

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, HelpResolver, AIResolver],
      validate: false,
    }),
    cache: "bounded",
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
        redis,
      }),
    }),
  );

  app.listen(4001, () => {
    console.log(
      "🚀 Community Post Service running at http://localhost:4001/graphql",
    );
  });
};

main();
