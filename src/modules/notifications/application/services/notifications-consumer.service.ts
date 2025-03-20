import { Injectable, OnModuleInit } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class NotificationsConsumerService implements OnModuleInit {
  onModuleInit() {
    console.log('📡 Consumer de notificações conectado ao RabbitMQ');
  }

  @MessagePattern('notification_created')
  handleNotification(data: { message: string }) {
    console.log(`📩 Nova notificação recebida: ${data.message}`);
  }
}
