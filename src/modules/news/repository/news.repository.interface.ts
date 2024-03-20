import { CreateNewsDto, UpdateNewsDto } from './news.repository.dto';
import { AffectResult } from './news.repository.result';

export interface NewsRepositoryInterface {
  createNews(dto: CreateNewsDto): Promise<AffectResult>;

  updateNews(dto: UpdateNewsDto): Promise<AffectResult>;

  deleteNews(id: string): Promise<AffectResult>;
}
