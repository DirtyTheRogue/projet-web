import { Worker } from 'bullmq';
import { connection } from './redis.config';

const worker = new Worker('docs-queue', async job => {
  const { action, document } = job.data;
  console.log(`Traitement du job: ${action} pour document id=${document.id}, title=${document.title}`);

}, { connection });
  