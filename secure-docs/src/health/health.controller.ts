import { Controller, Get } from '@nestjs/common';
import { QueueService } from '../queue/queue.service';

@Controller('health')
export class HealthController {
  constructor(private readonly queueService: QueueService) {}

  @Get()
  getHealth() {
    return { status: 'OK' };
  }

  @Get('job')
  async triggerJob() {
  await this.queueService.addJob({ message: 'Hello from HealthController' });
    return { status: 'Job added' };
  }
}
