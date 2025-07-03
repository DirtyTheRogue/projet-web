import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.create(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async me(@Context() context): Promise<User> {
    const user = context.req.user;
    if (!user) {
      throw new Error(`User not found with id ${user.userId}`);
    }

    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [User])
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User)
  getUser(@Context('user') user: any) {
    const found = this.usersService.findById(user.userId);
    if (!found) {
      throw new Error('Utilisateur introuvable');
    }

    return found;
  }
}
