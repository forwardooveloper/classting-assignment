import { Inject, Injectable } from '@nestjs/common';

import { SchoolServiceInterface } from './school.service.interface';
import { AddSchoolDto } from './school.service.dto';
import { SCHOOL_REPOSITORY } from '../symbol/school.symbol';
import { SchoolRepositoryInterface } from '../repository/school.repository.interface';
import { AddSchoolResult } from './school.service.result';
import { DATE_UTIL } from 'src/libs/date-util/symbol/date-util.symbol';
import { DateUtilInterface } from 'src/libs/date-util/date-util.interface';

@Injectable()
export class SchoolService implements SchoolServiceInterface {
  constructor(
    @Inject(SCHOOL_REPOSITORY) private repository: SchoolRepositoryInterface,
    @Inject(DATE_UTIL) private dateUtil: DateUtilInterface,
  ) {}

  async addSchool(dto: AddSchoolDto): Promise<AddSchoolResult> {
    return await this.repository.createSchool(dto);
  }
}
