import { Module } from '@nestjs/common';

import { SubscriptionModule } from './modules/subscription/subscription.module';
import { SchoolModule } from './modules/school/school.module';
import { DateUtilModule } from './libs/date-util/date-util.module';
import { DynamodbModule } from './libs/dynamodb/dynamodb.module';

@Module({
  imports: [SubscriptionModule, SchoolModule, DateUtilModule, DynamodbModule],
})
export class AppModule {}
