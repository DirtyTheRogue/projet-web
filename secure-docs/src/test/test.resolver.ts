import { Query, Resolver } from '@nestjs/graphql';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class TestResult {
  @Field()
  result: string;
}

@Resolver(() => TestResult)
export class TestResolver {
  @Query(() => TestResult)
  test(): TestResult {
    return { result: 'ok' };
  }
}
