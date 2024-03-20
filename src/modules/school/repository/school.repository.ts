import { Inject, Injectable } from '@nestjs/common';
import { SchoolRepositoryInterface } from './school.repository.interface';
import {
  CreateNewsDto,
  CreateSchoolDto,
  DeleteNewsDto,
  UpdateNewsDto,
} from './school.repository.dto';
import { AffectResult, GetNewsResult } from './schoo.repository.result';
import { v4 } from 'uuid';
import { DYNAMODB } from 'src/libs/dynamodb/symbol/dynamodb-manager.symbol';
import { Dynamodb } from 'src/libs/dynamodb/dynamodb';

@Injectable()
export class SchoolRepository implements SchoolRepositoryInterface {
  constructor(@Inject(DYNAMODB) private dynamodb: Dynamodb) {}

  async createSchool(dto: CreateSchoolDto): Promise<AffectResult> {
    const idPostfix = v4();

    await this.dynamodb.putItem({
      TableName: 'TestTable',
      Item: {
        PK: `SCHOOL#${idPostfix}`,
        SK: 'sortkey',
        name: dto.name,
        region: dto.region,
      },
    });

    return { affectedId: idPostfix };
  }

  async createNews(dto: CreateNewsDto): Promise<AffectResult> {
    const idPostfix = v4();

    await this.dynamodb.putItem({
      TableName: 'TestTable',
      Item: {
        PK: `NEWS#${idPostfix}`,
        SK: `SCHOOL#${dto.id}#sortkey`,
        title: dto.title,
        content: dto.content,
      },
    });

    return { affectedId: idPostfix };
  }

  async updateNews(dto: UpdateNewsDto): Promise<AffectResult> {
    await this.dynamodb.putItem({
      TableName: 'TestTable',
      Item: {
        PK: `NEWS#${dto.newsId}`,
        SK: `SCHOOL#${dto.id}#sortkey`,
        title: dto.title,
        content: dto.content,
      },
    });

    return { affectedId: dto.newsId };
  }

  async deleteNews(dto: DeleteNewsDto): Promise<AffectResult> {
    await this.dynamodb.deleteItem({
      TableName: 'TestTable',
      Key: {
        PK: `NEWS#${dto.newsId}`,
        SK: `SCHOOL#${dto.id}#sortkey`,
      },
    });

    return { affectedId: dto.newsId };
  }

  async getNews(dto: any): Promise<GetNewsResult> {
    const queryResult = await this.dynamodb.getItem({
      TableName: 'TestTable',
      Key: {
        PK: `NEWS#${dto.newsId}`,
        SK: `SCHOOL#${dto.id}#sortkey`,
      },
    });

    return queryResult.Item
      ? {
          id: dto.id,
          newsId: dto.newsId,
          title: queryResult.Item.title,
          content: queryResult.Item.content,
        }
      : undefined;
  }
}
