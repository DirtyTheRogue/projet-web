import { Injectable, NotFoundException } from '@nestjs/common';
import { Document } from './entities/document.entity';
import { CreateDocumentInput } from './dto/create-document.input';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class DocumentsService {
  constructor(private readonly queueService: QueueService) {}

  private documents: Document[] = [];

  async create(input: CreateDocumentInput): Promise<Document> {
    const doc: Document = { id: Date.now().toString(), ...input };
    this.documents.push(doc);
    await this.queueService.addJob({ action: 'create', document: doc });
    return doc;
  }

  findByUser(userId: string): Document[] {
    return this.documents.filter(d => d.userId === userId);
  }

  findOne(id: string): Document {
    const doc = this.documents.find(d => d.id === id);
    if (!doc) throw new NotFoundException('Document not found');
    return doc;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.documents.findIndex(d => d.id === id);
    if (index === -1) return false;
    const [doc] = this.documents.splice(index, 1);
    await this.queueService.addJob({ action: 'delete', document: doc });
    return true;
  }
}
