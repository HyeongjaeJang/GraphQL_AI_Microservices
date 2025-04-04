import { ObjectType, Field } from "type-graphql";
import {
  prop as Property,
  getModelForClass,
  modelOptions,
  mongoose,
} from "@typegoose/typegoose";

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  @Field(() => String)
  @Property()
  _id: mongoose.Types.ObjectId;

  @Field(() => String)
  @Property({ required: true, unique: true })
  Username: string;

  @Field(() => String)
  @Property({ required: true, unique: true })
  Email: string;

  @Property({ required: true })
  Password: string;

  @Field(() => String)
  @Property({
    required: true,
    enum: ["resident", "business_owner", "community_organizer"],
  })
  Role: string;

  @Field(() => String)
  createdAt: Date;
}

export const UserModel = getModelForClass(User);
