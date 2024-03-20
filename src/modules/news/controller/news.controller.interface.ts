import {
  DeleteNewsDto,
  PostNewsDto,
  PutNewsIdDto,
} from './news.controller.dto';
import { PostNewsResult } from './news.controller.result';

export interface NewsControllerInterface {
  postNews(dto: PostNewsDto): Promise<PostNewsResult>;

  putNews(targetDto: PutNewsIdDto, dto: PostNewsDto): Promise<PostNewsResult>;

  deleteNews(dto: DeleteNewsDto): Promise<PostNewsResult>;
}
