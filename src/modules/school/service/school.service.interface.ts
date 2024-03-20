import { AddSchoolDto } from './school.service.dto';
import { AddSchoolResult } from './school.service.result';

export interface SchoolServiceInterface {
  addSchool(dto: AddSchoolDto): Promise<AddSchoolResult>;
}
