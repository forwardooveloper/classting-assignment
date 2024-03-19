import { Module } from '@nestjs/common';
import { NewsController } from './controller/news.controller';

@Module({
  controllers: [NewsController],
})
export class NewsModule {}
