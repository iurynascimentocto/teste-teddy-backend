import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class NotificationsProducerService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
        queue: 'notifications_queue',
        queueOptions: { durable: true },
      },
    });
  }

  async sendNotification(message: string) {
    console.log(`📤 Enviando mensagem: ${message}`);
    return this.client.emit('notification_created', { message });
  }
}
