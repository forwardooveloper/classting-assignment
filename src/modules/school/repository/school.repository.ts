import { Injectable } from '@nestjs/common';
import { SchoolRepositoryInterface } from './school.repository.interface';
import { CreateSchoolDto } from './school.repository.dto';

@Injectable()
export class SchoolRepository implements SchoolRepositoryInterface {
  constructor() {}
  createSchool(dto: CreateSchoolDto): Promise<void> {
    console.log(dto);

    return;
  }
}
