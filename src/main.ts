import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { setupTracing } from './config/tracing';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  // Inicializa OpenTelemetry (Tracing + Métricas)
  setupTracing();

  // Habilita validação global para DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Usa Pino para logs estruturados
  app.useLogger(app.get(Logger));

  // Habilita CORS
  app.enableCors();

  // Inicializa o microserviço RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: 'notifications_queue',
      queueOptions: { durable: true },
    },
  });

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Teddy API')
    .setDescription('Documentação da API do teste de Tech Lead - Teddy')
    .setVersion('1.0')
    .addTag('clients')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();

  await app.listen(port);
  console.log(`🚀 Server rodando em http://localhost:${port}`);
  console.log(`📄 Swagger disponível em http://localhost:${port}/api`);
}
bootstrap();
