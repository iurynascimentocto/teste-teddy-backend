import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  // Habilita validação global para DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Habilita CORS
  // app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Teddy API')
    .setDescription('Documentação da API do teste de Tech Lead - Teddy')
    .setVersion('1.0')
    .addTag('clients')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  console.log(`🚀 Server rodando em http://localhost:${port}`);
  console.log(`📄 Swagger disponível em http://localhost:${port}/api`);
}
bootstrap();
