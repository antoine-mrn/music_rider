import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { HttpExceptionFilter } from './http-exception.filter';
import cookieParser from 'cookie-parser';
import { PrismaExceptionFilter } from './prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Allow specific domain
    methods: 'GET,POST,PUT,PATCH,DELETE', // Allow HTTP methods
    credentials: true, // Allow cookies to be sent
    allowedHeaders: 'Content-Type, Authorization', // Permitted request headers
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter(), new PrismaExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
