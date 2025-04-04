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
export class Help {
  @Field(() => String)
  @Property()
  _id: mongoose.Types.ObjectId;

  @Field(() => String)
  @Property({ required: true, ref: "User" })
  Author: Ref<mongoose.Types.ObjectId>;

  @Field(() => String)
  @Property({ required: true })
  Description: string;

  @Field(() => String)
  @Property()
  Location: string;

  @Field(() => Boolean)
  @Property()
  isResolved: boolean;

  @Field(() => [String], { nullable: true })
  @Property({ type: () => [mongoose.Types.ObjectId], default: [] })
  volunteers: Ref<mongoose.Types.ObjectId>[];

  @Field(() => String)
  createdAt: Date;

  @Field(() => String)
  updatedAt: Date;
}

export const HelpModel = getModelForClass(Help);
