import {
  IdDto,
  IdWithNewsIdDto,
  PostNewsDto,
  PostSchoolDto,
} from './school.controller.dto';
import {
  DeleteNewsResult,
  PostNewsResult,
  PostSchoolResult,
  PutNewsResult,
} from './school.controller.result';

export interface SchoolControllerInterface {
  postSchool(dto: PostSchoolDto): Promise<PostSchoolResult>;

  postNews(idDto: IdDto, dto: PostNewsDto): Promise<PostNewsResult>;

  putNews(idSetDto: IdWithNewsIdDto, dto: PostNewsDto): Promise<PutNewsResult>;

  deleteNews(idSetDto: IdWithNewsIdDto): Promise<DeleteNewsResult>;
}
