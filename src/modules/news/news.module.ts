import { Module } from '@nestjs/common';
import { NewsController } from './controller/news.controller';
import { NEWS_REPOSITORY, NEWS_SERVICE } from './symbol/news.symbol';
import { NewsRepository } from './repository/news.repository';
import { NewsService } from './service/news.service';
import { DYNAMODB } from '../../libs/dynamodb/symbol/dynamodb-manager.symbol';
import { Dynamodb } from '../../libs/dynamodb/dynamodb';
import { DATE_UTIL } from 'src/libs/date-util/symbol/date-util.symbol';
import { DateUtil } from 'src/libs/date-util/date-util';

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
    {
      provide: DYNAMODB,
      useClass: Dynamodb,
    },
    {
      provide: DATE_UTIL,
      useClass: DateUtil,
    },
  ],
})
export class NewsModule {}
