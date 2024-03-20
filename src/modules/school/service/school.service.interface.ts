import {
  AddNewsDto,
  AddSchoolDto,
  DeleteNewsDto,
  ModifyNewsDto,
} from './school.service.dto';
import {
  AddNewsResult,
  AddSchoolResult,
  ModifyNewsResult,
  RemoveNewsResult,
} from './school.service.result';

export interface SchoolServiceInterface {
  addSchool(dto: AddSchoolDto): Promise<AddSchoolResult>;

  addNews(dto: AddNewsDto): Promise<AddNewsResult>;

  modifyNews(dto: ModifyNewsDto): Promise<ModifyNewsResult>;

  removeNews(dto: DeleteNewsDto): Promise<RemoveNewsResult>;
}
