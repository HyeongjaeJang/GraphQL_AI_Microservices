import { ObjectType, Field } from "type-graphql";
import {
  prop as Property,
  Ref,
  getModelForClass,
  modelOptions,
  mongoose,
} from "@typegoose/typegoose";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class Post {
  @Field(() => String)
  @Property()
  _id: mongoose.Types.ObjectId;

  @Field(() => String)
  @Property({
    required: true,
    ref: "User",
  })
  Author: Ref<mongoose.Types.ObjectId>;

  @Field(() => String)
  @Property({ required: true })
  Title: string;

  @Field(() => String)
  @Property({ required: true })
  Content: string;

  @Field(() => String)
  @Property({
    required: true,
    enum: ["news", "discussion"],
  })
  Category: string;

  @Field(() => String, { nullable: true })
  @Property()
  AiSummary: string;

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const PostModel = getModelForClass(Post);
