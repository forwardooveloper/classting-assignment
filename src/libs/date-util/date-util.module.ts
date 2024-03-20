import { Module } from '@nestjs/common';
import { DATE_UTIL } from './symbol/date-util.symbol';
import { DateUtil } from './date-util';

@Module({
  providers: [
    {
      provide: DATE_UTIL,
      useClass: DateUtil,
    },
  ],
  exports: [DATE_UTIL],
})
export class DateUtilModule {}
