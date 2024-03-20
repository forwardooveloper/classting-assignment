import { Module } from '@nestjs/common';
import { NewsController } from './controller/news.controller';
import { NEWS_REPOSITORY, NEWS_SERVICE } from './symbol/news.symbol';
import { NewsRepository } from './repository/news.repository';
import { NewsService } from './service/news.service';

@Module({
  controllers: [NewsController],
  providers: [
    {
      provide: NEWS_REPOSITORY,
      useClass: NewsRepository,
    },
    {
      provide: NEWS_SERVICE,
      useClass: NewsService,
    },
  ],
})
export class NewsModule {}
