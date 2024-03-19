import { Module } from '@nestjs/common';

import { NewsModule } from './modules/news/news.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { SchoolModule } from './modules/school/school.module';

@Module({
  imports: [NewsModule, SubscriptionModule, SchoolModule],
})
export class AppModule {}
