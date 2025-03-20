import { Module } from '@nestjs/common';
import { NotificationsProducerService } from './application/services/notifications-producer.service';
import { NotificationsConsumerService } from './application/services/notifications-consumer.service';
import { NotificationsController } from './presentation/controllers/notifications.controller';

@Module({
  providers: [NotificationsProducerService, NotificationsConsumerService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
