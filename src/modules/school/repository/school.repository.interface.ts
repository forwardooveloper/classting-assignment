import {
  AffectResult,
  GetNewsResult,
  GetSchoolResult,
} from './school.repository.result';
import {
  CreateNewsDto,
  CreateSchoolDto,
  DeleteNewsDto,
  GetNewsDto,
  UpdateNewsDto,
} from './school.repository.dto';

export interface SchoolRepositoryInterface {
  createSchool(dto: CreateSchoolDto): Promise<AffectResult>;

  createNews(dto: CreateNewsDto): Promise<AffectResult>;

  updateNews(dto: UpdateNewsDto): Promise<AffectResult>;

  deleteNews(dto: DeleteNewsDto): Promise<AffectResult>;

  getNews(dto: GetNewsDto): Promise<GetNewsResult>;

  getSchool(id: string): Promise<GetSchoolResult>;
}
