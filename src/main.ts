import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:8081', 'https://squirelproject.netlify.app'],
      credentials: true,
    },
  });
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
  await app.listen(3000);
}
bootstrap();
