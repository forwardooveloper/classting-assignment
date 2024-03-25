import { Inject, Injectable } from '@nestjs/common';
import { SchoolRepositoryInterface } from './school.repository.interface';
import {
  CreateNewsDto,
  CreateSchoolDto,
  DeleteNewsDto,
  UpdateNewsDto,
} from './school.repository.dto';
import {
  AffectResult,
  GetNewsResult,
  GetSchoolResult,
} from './school.repository.result';
import { v4 } from 'uuid';
import { DYNAMODB } from '../../../libs/dynamodb/symbol/dynamodb-manager.symbol';
import { Dynamodb } from '../../../libs/dynamodb/dynamodb';
import { DATE_UTIL } from '../../../libs/date-util/symbol/date-util.symbol';
import { DateUtilInterface } from '../../../libs/date-util/date-util.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SchoolRepository implements SchoolRepositoryInterface {
  constructor(
    @Inject(DYNAMODB) private dynamodb: Dynamodb,
    @Inject(DATE_UTIL) private dateUtil: DateUtilInterface,
    private configService: ConfigService,
  ) {}

  public async createSchool(dto: CreateSchoolDto): Promise<AffectResult> {
    const idPostfix = v4();

    await this.dynamodb.putItem({
      TableName: this.configService.get<string>('dynamodb.tableName'),
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

  public async createNews(dto: CreateNewsDto): Promise<AffectResult> {
    const newsId = v4();
    await this.dynamodb.putItem({
      TableName: this.configService.get<string>('dynamodb.tableName'),
      Item: {
        PK: `SCHOOL#${dto.id}`,
        SK: `NEWS#${newsId}`,
        title: dto.title,
        content: dto.content,
        createdAt: this.dateUtil.getNowTimestamp(),
        updatedAt: this.dateUtil.getNowTimestamp(),
      },
    });

    return { affectedId: newsId };
  }

  public async updateNews(dto: UpdateNewsDto): Promise<AffectResult> {
    await this.dynamodb.updateItem({
      TableName: this.configService.get<string>('dynamodb.tableName'),
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

  public async deleteNews(dto: DeleteNewsDto): Promise<AffectResult> {
    const result = await this.dynamodb.deleteItem({
      TableName: this.configService.get<string>('dynamodb.tableName'),
      Key: {
        PK: `SCHOOL#${dto.id}`,
        SK: `NEWS#${dto.newsId}`,
      },
    });

    console.log(result);

    return { affectedId: dto.newsId };
  }

  public async getNews(dto: any): Promise<GetNewsResult> {
    const queryResult = await this.dynamodb.getItem({
      TableName: this.configService.get<string>('dynamodb.tableName'),
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

  public async getSchool(id: string): Promise<GetSchoolResult> {
    console.log(id);
    const school = await this.dynamodb.getItem({
      TableName: this.configService.get<string>('dynamodb.tableName'),
      Key: {
        PK: `SCHOOL#${id}`,
        SK: 'METADATA',
      },
    });

    return school.Item
      ? {
          id,
          name: school.Item.name,
          region: school.Item.region,
        }
      : undefined;
  }
}
