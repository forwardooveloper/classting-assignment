import { Injectable } from '@nestjs/common';
import { SchoolRepositoryInterface } from './school.repository.interface';
import { CreateSchoolDto } from './school.repository.dto';
import { AffectResult } from './schoo.repository.result';
import { v4 } from 'uuid';

@Injectable()
export class SchoolRepository implements SchoolRepositoryInterface {
  constructor() {}

  async createSchool(dto: CreateSchoolDto): Promise<AffectResult> {
    const id = `SCHOOL#${v4()}`;
    console.log(dto);

    return { affectedId: id };
  }
}
