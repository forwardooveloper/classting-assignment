import { Injectable } from '@nestjs/common';
import { SchoolRepositoryInterface } from './school.repository.interface';

@Injectable()
export class SchoolRepository implements SchoolRepositoryInterface {
  constructor() {}
}
