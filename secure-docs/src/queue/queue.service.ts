import { Injectable, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bullmq';
import { connection } from './redis.config';

@Injectable()
export class QueueService implements OnModuleInit {
  private queue: Queue;

  onModuleInit() {
    this.queue = new Queue('docs-queue', { connection });
  }

  async addJob(data: any) {
    await this.queue.add('new-job', data);
  }
}
