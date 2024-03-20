import { AffectResult } from './schoo.repository.result';
import { CreateSchoolDto } from './school.repository.dto';

export interface SchoolRepositoryInterface {
  createSchool(dto: CreateSchoolDto): Promise<AffectResult>;
}
