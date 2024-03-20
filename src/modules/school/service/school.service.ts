import { Inject, Injectable } from '@nestjs/common';

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
import { DATE_UTIL } from 'src/libs/date-util/symbol/date-util.symbol';
import { DateUtilInterface } from 'src/libs/date-util/date-util.interface';

@Injectable()
export class SchoolService implements SchoolServiceInterface {
  constructor(
    @Inject(SCHOOL_REPOSITORY) private repository: SchoolRepositoryInterface,
    @Inject(DATE_UTIL) private dateUtil: DateUtilInterface,
  ) {}

  async addSchool(dto: AddSchoolDto): Promise<AddSchoolResult> {
    return await this.repository.createSchool({
      name: dto.name,
      region: dto.region,
      createdAt: this.dateUtil.getNowTimestamp(),
    });
  }

  async addNews(dto: AddNewsDto): Promise<AddNewsResult> {
    return await this.repository.createNews({
      id: dto.id,
      title: dto.title,
      content: dto.content,
      createdAt: this.dateUtil.getNowTimestamp(),
    });
  }

  async modifyNews(dto: ModifyNewsDto): Promise<ModifyNewsResult> {
    return await this.repository.updateNews({
      id: dto.id,
      newsId: dto.newsId,
      title: dto.title,
      content: dto.content,
      updatedAt: this.dateUtil.getNowTimestamp(),
    });
  }

  async removeNews(dto: DeleteNewsDto): Promise<RemoveNewsResult> {
    return await this.repository.deleteNews({
      id: dto.id,
      newsId: dto.newsId,
    });
  }
}
