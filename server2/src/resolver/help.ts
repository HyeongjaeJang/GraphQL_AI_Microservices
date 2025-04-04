import { HelpInput } from "../types/helpInput";
import { Help, HelpModel } from "../models/Help";
import {
  Resolver,
  Query,
  Arg,
  Mutation,
  FieldResolver,
  Root,
} from "type-graphql";
import mongoose from "mongoose";
import axios from "axios";

@Resolver(Help)
export class HelpResolver {
  @FieldResolver(() => String)
  async Author(@Root() root: Help): Promise<string> {
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

  @FieldResolver(() => [String])
  async volunteers(@Root() root: Help): Promise<string[]> {
    const helpDoc = root as any;
    const help = helpDoc.volunteers || helpDoc?._doc?.volunteers;

    if (!help || help.length === 0) return [];

    const ids = help.map((id: mongoose.Types.ObjectId) => id.toString());
    try {
      const { data } = await axios.post(
        `http://localhost:4002/user/graphql`,
        {
          query: `
          query GetVolunteers($ids: [String!]!) {
            volunteers(ids: $ids) { Username }
          }
        `,
          variables: { ids },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return data.data.volunteers.map((user: any) => user.Username);
    } catch (err) {
      console.error("❌ Axios Error:", err);
      return [];
    }
  }

  @FieldResolver(() => [String])
  async volunteersIds(@Root() root: Help): Promise<string[]> {
    const helpDoc = root as any;
    const help = helpDoc.volunteers || helpDoc?._doc?.volunteers;

    if (!help || help.length === 0) return [];

    const ids = help.map((id: mongoose.Types.ObjectId) => id.toString());
    try {
      const { data } = await axios.post(
        `http://localhost:4002/user/graphql`,
        {
          query: `
          query GetVolunteers($ids: [String!]!) {
            volunteers(ids: $ids) { _id, Username }
          }
        `,
          variables: { ids },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return data.data.volunteers.map((user: any) => user._id);
    } catch (err) {
      console.error("❌ Axios Error:", err);
      return [];
    }
  }

  @Query(() => [Help], { nullable: true })
  async helps(): Promise<Help[]> {
    return await HelpModel.find();
  }
  @Query(() => Help, { nullable: true })
  async help(@Arg("id") id: string): Promise<Help | null> {
    return await HelpModel.findById(id);
  }
  @Mutation(() => Help)
  async createHelp(@Arg("input") input: HelpInput): Promise<Help> {
    return await HelpModel.create({
      _id: new mongoose.Types.ObjectId(),
      ...input,
    });
  }
  @Mutation(() => Help)
  async updateHelp(
    @Arg("id") id: string,
    @Arg("input") input: HelpInput,
  ): Promise<Help | null> {
    return await HelpModel.findByIdAndUpdate(id, input, {
      new: true,
      runValidators: true,
    });
  }
  @Mutation(() => Boolean)
  async deleteHelp(@Arg("id") id: string): Promise<boolean> {
    try {
      await HelpModel.findByIdAndDelete(id);
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
  @Mutation(() => Boolean)
  async addVolunteer(
    @Arg("id") id: string,
    @Arg("volunteerId") volunteerId: string,
  ): Promise<boolean> {
    try {
      const help = await HelpModel.findById(id);
      help?.volunteers.push(new mongoose.Types.ObjectId(volunteerId));
      help?.save();
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}
