import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  ObjectType,
  Ctx,
} from "type-graphql";
import { User, UserModel } from "../models/User";
import { MyContext } from "../types/context";
import { validateInputs } from "../utils/validateInputs";
import argon2 from "argon2";
import { UserInput } from "../types/userInput";
import mongoose from "mongoose";

@ObjectType()
class errorField {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class userResoponse {
  @Field(() => [errorField], { nullable: true })
  errors?: errorField[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    return await UserModel.findById(req.session.userId);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserModel.find();
  }
  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: string): Promise<User | null> {
    return await UserModel.findById(id);
  }
  @Query(() => User, { nullable: true })
  async userByName(@Arg("username") username: string): Promise<User | null> {
    return await UserModel.findOne({ Username: username });
  }
  @Query(() => [User], { nullable: true })
  async volunteers(
    @Arg("ids", () => [String]) ids: string[],
  ): Promise<User[] | null> {
    const volunteers = UserModel.find({ _id: { $in: ids } });
    return volunteers;
  }
  @Mutation(() => userResoponse)
  async signUp(
    @Arg("input") input: UserInput,
    @Ctx() { req }: MyContext,
  ): Promise<userResoponse> {
    const errors = validateInputs(input);
    if (errors) {
      return { errors };
    }
    const hashedPassword = await argon2.hash(input.password);
    let user;

    try {
      const result = await UserModel.create({
        _id: new mongoose.Types.ObjectId(),
        Username: input.username,
        Email: input.email,
        Password: hashedPassword,
        Role: input.role,
        createdAt: new Date(),
      });
      result.save();
      user = result;
    } catch (err) {
      if (err.code === 11000) {
        const duplicate = Object.keys(err.keyPattern)[0];

        return {
          errors: [
            {
              field: duplicate,
              message: `${duplicate} already exists`,
            },
          ],
        };
      } else {
        return {
          errors: [
            {
              field: "error",
              message: "something went wrong",
            },
          ],
        };
      }
    }
    if (user) {
      req.session.userId = user?._id.toString();
    }
    return { user };
  }

  @Mutation(() => userResoponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext,
  ): Promise<userResoponse | null> {
    const user = await UserModel.findOne({ Email: email });
    if (!user) {
      return {
        errors: [
          {
            message: "user does not exist",
            field: "Email",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.Password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    req.session.userId = user._id.toString();

    return { user };
  }
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("lab");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      }),
    );
  }
}
