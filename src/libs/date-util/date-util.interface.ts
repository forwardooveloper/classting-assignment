export interface DateUtilInterface {
  getTimestampFromDate(date: Date): number;
  getDateFromTimestamp(timestamp: number): Date;
  getNowTimestamp(): number;
  getNowDate(): Date;
}
