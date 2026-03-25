import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validateEnv } from '@jess-web/env';

async function bootstrap() {
  validateEnv();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
