import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './queue/queue.processor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //CORS pour autoriser le frontend 
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
