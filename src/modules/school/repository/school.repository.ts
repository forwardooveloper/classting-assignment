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
import { DATE_UTIL } from 'src/libs/date-util/symbol/date-util.symbol';
import { DateUtilInterface } from 'src/libs/date-util/date-util.interface';

@Injectable()
export class SchoolRepository implements SchoolRepositoryInterface {
  constructor(
    @Inject(DYNAMODB) private dynamodb: Dynamodb,
    @Inject(DATE_UTIL) private dateUtil: DateUtilInterface,
  ) {}

  async createSchool(dto: CreateSchoolDto): Promise<AffectResult> {
    const idPostfix = v4();

    await this.dynamodb.putItem({
      TableName: 'Classting',
      Item: {
        PK: `SCHOOL#${idPostfix}`,
        SK: 'METADATA',
        name: dto.name,
        region: dto.region,
        createdAt: this.dateUtil.getNowTimestamp(),
      },
    });

    return { affectedId: idPostfix };
  }

  async createNews(dto: CreateNewsDto): Promise<AffectResult> {
    const newsId = v4();
    await this.dynamodb.putItem({
      TableName: 'Classting',
      Item: {
        PK: `SCHOOL#${dto.id}`,
        SK: `NEWS#${newsId}`,
        title: dto.title,
        content: dto.content,
        createdAt: this.dateUtil.getNowTimestamp(),
        updatedAt: this.dateUtil.getNowTimestamp(),
      },
    });

    console.log(await this.getNews({ id: dto.id, newsId }));

    return { affectedId: newsId };
  }

  async updateNews(dto: UpdateNewsDto): Promise<AffectResult> {
    await this.dynamodb.updateItem({
      TableName: 'Classting',
      Key: {
        PK: `SCHOOL#${dto.id}`,
        SK: `NEWS#${dto.newsId}`,
      },
      UpdateExpression:
        'SET title = :title, content = :content, updatedAt = :updatedAt',
      ExpressionAttributeValues: {
        ':title': dto.title,
        ':content': dto.content,
        ':updatedAt': this.dateUtil.getNowTimestamp(),
      },
    });

    return { affectedId: dto.newsId };
  }

  async deleteNews(dto: DeleteNewsDto): Promise<AffectResult> {
    await this.dynamodb.deleteItem({
      TableName: 'Classting',
      Key: {
        PK: `SCHOOL#${dto.id}`,
        SK: `NEWS#${dto.newsId}`,
      },
    });

    return { affectedId: dto.newsId };
  }

  async getNews(dto: any): Promise<GetNewsResult> {
    const queryResult = await this.dynamodb.getItem({
      TableName: 'Classting',
      Key: {
        PK: `SCHOOL#${dto.id}`,
        SK: `NEWS#${dto.newsId}`,
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
