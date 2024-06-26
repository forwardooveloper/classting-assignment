import { Inject, Injectable } from '@nestjs/common';
import { StudentRepositoryInterface } from './student.repository.interface';
import { DYNAMODB } from '../../../libs/dynamodb/symbol/dynamodb-manager.symbol';
import { DATE_UTIL } from '../../../libs/date-util/symbol/date-util.symbol';
import { DateUtilInterface } from '../../../libs/date-util/date-util.interface';
import { DynamodbInterface } from '../../../libs/dynamodb/dynamodb.interface';
import {
  CreateSubscriptionDto,
  DeleteSubscriptionDto,
} from './student.repository.dto';
import {
  AffectResult,
  GetSchoolResult,
  GetSubscriptionListResult,
  GetSchoolWithNewsListResult,
} from './student.repository.result';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StudentRepository implements StudentRepositoryInterface {
  constructor(
    @Inject(DYNAMODB) private dynamodb: DynamodbInterface,
    @Inject(DATE_UTIL) private dateUtil: DateUtilInterface,
    private configService: ConfigService,
  ) {}

  public async createSubscription(
    dto: CreateSubscriptionDto,
  ): Promise<AffectResult> {
    await this.dynamodb.putItem({
      TableName: this.configService.get<string>('dynamodb.tableName'),
      Item: {
        PK: `STUDENT#${dto.id}`,
        SK: `SUBSCRIPTION#SCHOOL#${dto.schoolId}`,
        schoolName: dto.schoolName,
        schoolRegion: dto.schoolRegion,
        createdAt: this.dateUtil.getNowTimestamp(),
      },
    });

    return { affectedId: dto.id };
  }

  public async getSchool(schoolId: string): Promise<GetSchoolResult> {
    const school = await this.dynamodb.getItem({
      TableName: this.configService.get<string>('dynamodb.tableName'),
      Key: {
        PK: `SCHOOL#${schoolId}`,
        SK: 'METADATA',
      },
    });

    return school.Item
      ? {
          schoolId,
          name: school.Item.name,
          region: school.Item.region,
        }
      : undefined;
  }

  public async getSubscriptionList(
    id: string,
  ): Promise<GetSubscriptionListResult[]> {
    const subscriptions = await this.dynamodb.query({
      TableName: this.configService.get<string>('dynamodb.tableName'),
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `STUDENT#${id}`,
      },
    });

    return subscriptions.Items
      ? subscriptions.Items.map((item) => ({
          id,
          schoolId: item.SK.replace('SUBSCRIPTION#SCHOOL#', ''),
          schoolName: item.schoolName,
          schoolRegion: item.schoolRegion,
        }))
      : [];
  }

  public async deleteSubscription(
    dto: DeleteSubscriptionDto,
  ): Promise<AffectResult> {
    await this.dynamodb.deleteItem({
      TableName: this.configService.get<string>('dynamodb.tableName'),
      Key: {
        PK: `STUDENT#${dto.id}`,
        SK: `SUBSCRIPTION#SCHOOL#${dto.schoolId}`,
      },
    });

    return { affectedId: dto.id };
  }

  public async getSchoolWithNewsList(
    schoolId: string,
  ): Promise<GetSchoolWithNewsListResult> {
    const schoolWithNewsList = await this.dynamodb.query({
      TableName: this.configService.get<string>('dynamodb.tableName'),
      IndexName: 'CreatedAtSort',
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `SCHOOL#${schoolId}`,
      },
      ScanIndexForward: false,
    });

    if (!schoolWithNewsList.Items) return undefined;

    const schoolMetadata = schoolWithNewsList.Items.find(
      (item) => item.SK === 'METADATA',
    );

    const newsList = schoolWithNewsList.Items.filter(
      (item) => item.SK !== 'METADATA',
    );

    return {
      school: {
        id: schoolId,
        name: schoolMetadata.name,
        region: schoolMetadata.region,
      },
      newsList: newsList.map((news) => ({
        id: news.SK.replace('NEWS#', ''),
        title: news.title,
        content: news.content,
        createdAt: news.createdAt,
      })),
    };
  }
}
