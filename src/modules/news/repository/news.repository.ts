import { Injectable } from '@nestjs/common';
import { NewsRepositoryInterface } from './news.repository.interface';
import { CreateNewsDto, UpdateNewsDto } from './news.repository.dto';
import { AffectResult } from './news.repository.result';
import { v4 } from 'uuid';

@Injectable()
export class NewsRepository implements NewsRepositoryInterface {
  constructor() {}

  async createNews(dto: CreateNewsDto): Promise<AffectResult> {
    const id = `NEWS#${v4()}`;
    console.log(dto);

    return { affectedId: id };
  }

  async updateNews(dto: UpdateNewsDto): Promise<AffectResult> {
    console.log(dto);

    return { affectedId: dto.id };
  }

  async deleteNews(id: string): Promise<AffectResult> {
    console.log(id);

    return { affectedId: id };
  }
}
