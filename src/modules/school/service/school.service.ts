import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { SchoolServiceInterface } from './school.service.interface';
import {
  AddNewsDto,
  AddSchoolDto,
  DeleteNewsDto,
  ModifyNewsDto,
} from './school.service.dto';
import { SCHOOL_REPOSITORY } from '../symbol/school.symbol';
import { SchoolRepositoryInterface } from '../repository/school.repository.interface';
import {
  AddNewsResult,
  AddSchoolResult,
  ModifyNewsResult,
  RemoveNewsResult,
} from './school.service.result';

@Injectable()
export class SchoolService implements SchoolServiceInterface {
  constructor(
    @Inject(SCHOOL_REPOSITORY) private repository: SchoolRepositoryInterface,
  ) {}

  public async addSchool(dto: AddSchoolDto): Promise<AddSchoolResult> {
    return await this.repository.createSchool({
      name: dto.name,
      region: dto.region,
    });
  }

  public async addNews(dto: AddNewsDto): Promise<AddNewsResult> {
    return await this.repository.createNews({
      id: dto.id,
      title: dto.title,
      content: dto.content,
    });
  }

  public async modifyNews(dto: ModifyNewsDto): Promise<ModifyNewsResult> {
    await this.checkExistOfNews(dto.id, dto.newsId);

    return await this.repository.updateNews({
      id: dto.id,
      newsId: dto.newsId,
      title: dto.title,
      content: dto.content,
    });
  }

  public async removeNews(dto: DeleteNewsDto): Promise<RemoveNewsResult> {
    await this.checkExistOfNews(dto.id, dto.newsId);

    return await this.repository.deleteNews({
      id: dto.id,
      newsId: dto.newsId,
    });
  }

  private async checkExistOfNews(id: string, newsId: string) {
    const news = await this.repository.getNews({ id, newsId });

    if (!news) {
      throw new NotFoundException('News not found');
    }
  }
}
