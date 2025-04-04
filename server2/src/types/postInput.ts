import { InputType, Field } from "type-graphql";

@InputType()
export class PostInput {
  @Field()
  Author: string;

  @Field()
  Title: string;

  @Field()
  Content: string;

  @Field()
  Category: string;

  @Field(() => String, { nullable: true })
  AiSummary: string;
}
