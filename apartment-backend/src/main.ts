import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appEnv = configService.get<string>('APP_ENV', 'dev');
  // All APIs:
  // APP_ENV=sit → /sit
  // APP_ENV=uat → /uat
  // APP_ENV=dev → /dev
  app.setGlobalPrefix(appEnv);

  app.enableCors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Apartment API')
    .setDescription('API for managing apartments')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(`${appEnv}/api`, app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
