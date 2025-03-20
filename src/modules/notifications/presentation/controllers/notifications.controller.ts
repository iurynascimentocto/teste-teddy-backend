import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { NotificationsProducerService } from '../../application/services/notifications-producer.service';
import { SendNotificationDto } from '../../application/dtos/send-notification.dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(
    private readonly notificationsProducer: NotificationsProducerService,
  ) {}

  @ApiOperation({ summary: 'Enviar uma notificação para o RabbitMQ' })
  @ApiResponse({ status: 201, description: 'Mensagem enviada com sucesso' })
  @ApiBody({ type: SendNotificationDto })
  @Post()
  async sendNotification(@Body() body: SendNotificationDto) {
    await this.notificationsProducer.sendNotification(body.message);
    return {
      status: 'Mensagem enviada para o RabbitMQ!',
      message: body.message,
    };
  }
}
