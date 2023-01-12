import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { CookiesService } from './cookies/cookies.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();
  await app.listen(3000);

  const cookiesService = app.get(CookiesService);
  cookiesService.greeting();
}

bootstrap();
