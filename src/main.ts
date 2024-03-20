import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppValidationPipe } from './app.validation.pipe';
import { AppResponseInterceptor } from './app.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new AppValidationPipe());
  app.useGlobalInterceptors(new AppResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
