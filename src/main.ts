import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
   // Enable CORS
   app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('University API Documentation')
    .setDescription('API explanation of University')
    .setVersion('1.0')
    .addTag('University')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api_doc', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
