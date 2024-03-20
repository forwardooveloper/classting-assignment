import { AddNewsDto, ModifyNewsDto } from './news.service.dto';
import {
  AddNewsResult,
  ModifyNewsResult,
  RemoveNewsResult,
} from './news.service.result';

export interface NewsServiceInterface {
  addNews(dto: AddNewsDto): Promise<AddNewsResult>;
  modifyNews(dto: ModifyNewsDto): Promise<ModifyNewsResult>;
  removeNews(id: string): Promise<RemoveNewsResult>;
}
