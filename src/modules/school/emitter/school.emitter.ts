import { Injectable } from '@nestjs/common';

@Injectable()
export class SchoolEmiiter {
  async newsChanged() {
    console.log('news changed');
  }
}
