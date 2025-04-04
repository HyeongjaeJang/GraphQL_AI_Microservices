import { InputType, Field } from "type-graphql";

@InputType()
export class HelpInput {
  @Field()
  Author: string;

  @Field()
  Description: string;

  @Field()
  Location: string;

  @Field()
  isResolved: boolean;

  @Field(() => [String])
  volunteers: string[];
}
