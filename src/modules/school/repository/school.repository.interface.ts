import { CreateSchoolDto } from './school.repository.dto';

export interface SchoolRepositoryInterface {
  createSchool(dto: CreateSchoolDto): Promise<void>;
}
