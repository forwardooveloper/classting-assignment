import { Inject, Injectable } from '@nestjs/common';
import { NewsServiceInterface } from './news.service.interface';
import { NEWS_REPOSITORY } from '../symbol/news.symbol';
import { NewsRepositoryInterface } from '../repository/news.repository.interface';
import {
  AddNewsResult,
  ModifyNewsResult,
  RemoveNewsResult,
} from './news.service.result';

@Injectable()
export class NewsService implements NewsServiceInterface {
  constructor(
    @Inject(NEWS_REPOSITORY) private repository: NewsRepositoryInterface,
  ) {}

  async addNews(dto: any): Promise<AddNewsResult> {
    return await this.repository.createNews(dto);
  }

  async modifyNews(dto: any): Promise<ModifyNewsResult> {
    return await this.repository.updateNews(dto);
  }

  async removeNews(id: string): Promise<RemoveNewsResult> {
    return await this.repository.deleteNews(id);
  }
}
