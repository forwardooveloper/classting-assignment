import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { DateUtilInterface } from './date-util.interface';

@Injectable()
export class DateUtil implements DateUtilInterface {
  constructor() {
    dayjs.extend(utc);
  }

  public getTimestampFromDate(date: Date): number {
    return dayjs(date).utc().unix();
  }

  public getDateFromTimestamp(timestamp: number): Date {
    return dayjs.unix(timestamp).utc().toDate();
  }

  public getNowTimestamp(): number {
    return dayjs().utc().unix();
  }

  public getNowDate(): Date {
    return dayjs().utc().toDate();
  }
}
