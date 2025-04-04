import {
  prop as Property,
  getModelForClass,
  modelOptions,
  mongoose,
} from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class Interaction {
  @Field(() => String)
  @Property()
  _id: mongoose.Types.ObjectId;

  @Field(() => String)
  @Property({ required: true, ref: "User" })
  userId: string;

  @Field(() => String)
  @Property({ required: true })
  input: string;

  @Field(() => String)
  @Property({ required: true })
  response: string;

  @Field(() => [String], { nullable: true })
  @Property({ type: () => [mongoose.Schema.Types.Mixed], default: [] })
  retrievedPosts: { _id: string; title: string; category: string }[];

  @Field(() => [String], { nullable: true })
  @Property({ type: () => [mongoose.Schema.Types.Mixed], default: [] })
  retrievedHelps?: { _id: string; description: string; location: string }[];

  @Field(() => String)
  createdAt: Date;
}

export const InteractionModel = getModelForClass(Interaction);

export async function storeInteraction(interaction: {
  _id: mongoose.Types.ObjectId;
  userId: string;
  input: string;
  response: string;
  retrievedPosts: any[];
  retrievedHelps?: any[];
}) {
  const inter = await InteractionModel.create(interaction);
  inter.save();
}
