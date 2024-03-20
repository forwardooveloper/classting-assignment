import { Inject, Injectable } from '@nestjs/common';
import { NewsServiceInterface } from './news.service.interface';
import { NEWS_REPOSITORY } from '../symbol/news.symbol';
import { NewsRepositoryInterface } from '../repository/news.repository.interface';
import {
  AddNewsResult,
  ModifyNewsResult,
  RemoveNewsResult,
} from './news.service.result';
import { DATE_UTIL } from 'src/libs/date-util/symbol/date-util.symbol';
import { DateUtilInterface } from 'src/libs/date-util/date-util.interface';
import { AddNewsDto, ModifyNewsDto } from './news.service.dto';

@Injectable()
export class NewsService implements NewsServiceInterface {
  constructor(
    @Inject(NEWS_REPOSITORY) private repository: NewsRepositoryInterface,
    @Inject(DATE_UTIL) private dateUtil: DateUtilInterface,
  ) {}

  async addNews(dto: AddNewsDto): Promise<AddNewsResult> {
    return await this.repository.createNews({
      title: dto.title,
      content: dto.content,
      createdAt: this.dateUtil.getNowTimestamp(),
    });
  }

  async modifyNews(dto: ModifyNewsDto): Promise<ModifyNewsResult> {
    return await this.repository.updateNews({
      id: dto.id,
      title: dto.title,
      content: dto.content,
      updatedAt: this.dateUtil.getNowTimestamp(),
    });
  }

  async removeNews(id: string): Promise<RemoveNewsResult> {
    return await this.repository.deleteNews(id);
  }
}
