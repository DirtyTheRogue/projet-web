import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Document {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  fileUrl: string;

  @Field()
  userId: string;
}
