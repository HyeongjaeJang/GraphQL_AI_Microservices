import mongoose from "mongoose";
import { Post, PostModel } from "../models/Post";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
  Field,
  ObjectType,
  Ctx,
} from "type-graphql";
import { PostInput } from "../types/postInput";
import axios from "axios";
import { MyContext } from "../types/context";

@ObjectType()
export class AuthorResponse {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  userName: string;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => String)
  async Author(@Root() root: Post): Promise<string> {
    const postDoc = root as any;
    const author = postDoc.Author || postDoc?._doc?.Author;
    try {
      const { data } = await axios.post(
        `http://localhost:4002/user/graphql`,
        {
          query: `
        query {
          user(id: "${author}") {
            Username
          }
        }
      `,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return data.data.user.Username;
    } catch (err) {
      console.error("❌ Axios Error:", err);
      throw new Error("Failed to fetch author details");
    }
  }

  @Query(() => AuthorResponse, { nullable: true })
  async getAuthor(@Ctx() { req }: MyContext): Promise<AuthorResponse | null> {
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

      return {
        userId: data.data.me._id,
        userName: data.data.me.Username,
      };
    } catch (err) {
      console.error(
        "❌ Failed to fetch user data:",
        err.response?.data || err.message,
      );
      return null;
    }
  }

  @Query(() => [Post], { nullable: true })
  async posts(): Promise<Post[]> {
    return await PostModel.find();
  }
  @Query(() => Post, { nullable: true })
  async post(@Arg("id") id: string): Promise<Post | null> {
    return await PostModel.findById(id);
  }
  @Mutation(() => Post)
  async createPost(@Arg("input") input: PostInput): Promise<Post> {
    return await PostModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...input,
    });
  }
  @Mutation(() => Post)
  async updatePost(
    @Arg("id") id: string,
    @Arg("input") input: PostInput,
  ): Promise<Post | null> {
    return await PostModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });
  }
  @Mutation(() => Boolean)
  async deletePost(@Arg("id") id: string): Promise<boolean> {
    try {
      await PostModel.findByIdAndDelete(id);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
