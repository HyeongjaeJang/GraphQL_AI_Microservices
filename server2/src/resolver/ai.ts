import { Resolver, Query, Arg, Ctx, ObjectType, Field } from "type-graphql";
import { communityAIQuery } from "../ai/agent";
import { Post } from "../models/Post";
import { Help } from "../models/Help";
import { MyContext } from "../types/context";
import axios from "axios";
import { plainToInstance } from "class-transformer";

@ObjectType()
export class AIResponse {
  @Field(() => String)
  text: string;

  @Field(() => [String])
  suggestedQuestions: string[];

  @Field(() => [Post], { nullable: true })
  retrievedPosts?: Post[];

  @Field(() => [Help], { nullable: true })
  retrievedHelps?: Help[];
}

@Resolver()
export class AIResolver {
  @Query(() => AIResponse, { nullable: true })
  async communityAIQuery(
    @Arg("input") input: string,
    @Ctx() { req }: MyContext,
  ): Promise<AIResponse | null> {
    const sessionId = req.cookies;

    try {
      const { data } = await axios.post(
        "http://localhost:4000/graphql",
        {
          query: `
            query {
              me {
                _id
                Username
                Email
              }
            }
          `,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: `lab=${sessionId["lab"]}`,
          },
          withCredentials: true,
        },
      );

      if (!data.data.me) {
        console.warn("⚠️ No user found in user service.");
        return null;
      }

      const userId = data.data.me._id;
      console.log("AI Query received:", input, userId);

      const aiRes = await communityAIQuery(input, userId);

      // ✅ This won't run if the above throws
      console.log("ai response", aiRes);

      return {
        text: aiRes.text,
        suggestedQuestions: aiRes.suggestedQuestions,
        retrievedPosts: plainToInstance(Post, aiRes.retrievedPosts),
        retrievedHelps: plainToInstance(Help, aiRes.retrievedHelps),
      };
    } catch (err: any) {
      console.error("❌ AI Resolver error:", err.message || err);
      return null;
    }
  }
}
