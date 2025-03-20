import { ApiProperty } from '@nestjs/swagger';

export class SendNotificationDto {
  @ApiProperty({ example: 'Olá, esta é uma mensagem para o RabbitMQ!' })
  message: string;
}
