import { Module } from '@nestjs/common';
import { SchoolController } from './controller/school.controller';
import { SCHOOL_REPOSITORY, SCHOOL_SERVICE } from './symbol/school.symbol';
import { SchoolRepository } from './repository/school.repository';
import { SchoolService } from './service/school.service';
import { Dynamodb } from '../../libs/dynamodb/dynamodb';
import { DYNAMODB } from '../../libs/dynamodb/symbol/dynamodb-manager.symbol';
import { DATE_UTIL } from '../../libs/date-util/symbol/date-util.symbol';
import { DateUtil } from '../../libs/date-util/date-util';

@Module({
  controllers: [SchoolController],
  providers: [
    {
      provide: SCHOOL_REPOSITORY,
      useClass: SchoolRepository,
    },
    {
      provide: SCHOOL_SERVICE,
      useClass: SchoolService,
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
export class SchoolModule {}
