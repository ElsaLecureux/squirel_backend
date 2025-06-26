import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const allowedOrigins = [
    'http://localhost:8081',
    'http://10.179.7.13:8081',
    'https://squirelproject.netlify.app',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });
  app.use(cookieParser());
  app.use(helmet());
  app.get(DataSource);
  const config = new DocumentBuilder()
    .setTitle('Squirel API')
    .setDescription(
      'Squirel API helps to connect to Squirel app (mobile and web), and get users trophies and user number of times won for each game.',
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
