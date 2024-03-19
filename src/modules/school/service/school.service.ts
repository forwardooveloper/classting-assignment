import { Injectable } from '@nestjs/common';
import { SchoolServiceInterface } from './school.service.interface';

@Injectable()
export class SchoolService implements SchoolServiceInterface {
  constructor() {}
}
