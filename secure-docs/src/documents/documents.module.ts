import { Module } from '@nestjs/common';
import { DocumentsResolver } from './documents.resolver';
import { DocumentsService } from './documents.service';
import { QueueModule } from '../queue/queue.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    QueueModule,
    AuthModule,
  ],
  providers: [DocumentsResolver, DocumentsService],
})
export class DocumentsModule {}
