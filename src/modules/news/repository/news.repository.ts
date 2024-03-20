import { Inject, Injectable } from '@nestjs/common';
import { NewsRepositoryInterface } from './news.repository.interface';
import { CreateNewsDto, UpdateNewsDto } from './news.repository.dto';
import { AffectResult } from './news.repository.result';
import { v4 } from 'uuid';
import { DYNAMODB } from 'src/libs/dynamodb/symbol/dynamodb-manager.symbol';
import { DynamodbInterface } from 'src/libs/dynamodb/dynamodb.interface';

@Injectable()
export class NewsRepository implements NewsRepositoryInterface {
  constructor(@Inject(DYNAMODB) private dynamodb: DynamodbInterface) {}

  async createNews(dto: CreateNewsDto): Promise<AffectResult> {
    const id = `NEWS#${v4()}`;

    await this.dynamodb.putItem({
      TableName: 'TestTable',
      Item: {
        PK: id,
        SK: 'sortkey',
        title: dto.title,
        content: dto.content,
      },
    });

    return { affectedId: id };
  }

  async updateNews(dto: UpdateNewsDto): Promise<AffectResult> {
    await this.dynamodb.putItem({
      TableName: 'TestTable',
      Item: {
        PK: dto.id,
        SK: 'sortkey',
        title: dto.title,
        content: dto.content,
      },
    });

    return { affectedId: dto.id };
  }

  async deleteNews(id: string): Promise<AffectResult> {
    await this.dynamodb.deleteItem({
      TableName: 'TestTable',
      Key: {
        PK: id,
        SK: 'sortkey',
      },
    });

    return { affectedId: id };
  }
}
