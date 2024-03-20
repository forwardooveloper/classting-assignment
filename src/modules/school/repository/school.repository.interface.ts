import { AffectResult } from './schoo.repository.result';
import {
  CreateNewsDto,
  CreateSchoolDto,
  DeleteNewsDto,
  UpdateNewsDto,
} from './school.repository.dto';

export interface SchoolRepositoryInterface {
  createSchool(dto: CreateSchoolDto): Promise<AffectResult>;

  createNews(dto: CreateNewsDto): Promise<AffectResult>;

  updateNews(dto: UpdateNewsDto): Promise<AffectResult>;

  deleteNews(dto: DeleteNewsDto): Promise<AffectResult>;
}
