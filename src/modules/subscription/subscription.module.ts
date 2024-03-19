import { Module } from '@nestjs/common';
import { SubscriptionController } from './controller/subscription.controller';

@Module({
  controllers: [SubscriptionController],
})
export class SubscriptionModule {}
