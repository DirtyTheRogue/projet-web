import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Document } from './entities/document.entity';
import { CreateDocumentInput } from './dto/create-document.input';
import { DocumentsService } from './documents.service';


@UseGuards(GqlAuthGuard, RolesGuard)
@Resolver(() => Document)
export class DocumentsResolver {
  constructor(private readonly documentsService: DocumentsService) {}

  @Mutation(() => Document)
  async createDocument(
    @Args('input') input: CreateDocumentInput
  ): Promise<Document> {
    return this.documentsService.create(input);
  }

  @Query(() => [Document])
  getDocumentsByUser(@Args('userId') userId: string) {
    return this.documentsService.findByUser(userId);
  }

  @Query(() => Document)
  getDocumentById(@Args('id') id: string) {
    return this.documentsService.findOne(id);
  }

  @Mutation(() => Boolean)
  deleteDocument(@Args('id') id: string) {
    return this.documentsService.delete(id);
  }
}
