import { Inject, Injectable } from '@nestjs/common';
import { StudentRepositoryInterface } from './student.repository.interface';
import { DYNAMODB } from 'src/libs/dynamodb/symbol/dynamodb-manager.symbol';
import { DATE_UTIL } from 'src/libs/date-util/symbol/date-util.symbol';
import { DateUtilInterface } from 'src/libs/date-util/date-util.interface';
import { DynamodbInterface } from 'src/libs/dynamodb/dynamodb.interface';
import {
  CreateSubscriptionDto,
  DeleteSubscriptionDto,
} from './student.repository.dto';
import {
  AffectResult,
  GetSchoolResult,
  GetSubscriptionListResult,
  GetSchoolWithNewsResult,
} from './student.repository.result';

@Injectable()
export class StudentRepository implements StudentRepositoryInterface {
  constructor(
    @Inject(DYNAMODB) private dynamodb: DynamodbInterface,
    @Inject(DATE_UTIL) private dateUtil: DateUtilInterface,
  ) {}

  public async createSubscription(
    dto: CreateSubscriptionDto,
  ): Promise<AffectResult> {
    await this.dynamodb.putItem({
      TableName: 'Classting-v2',
      Item: {
        PK: `STUDENT#${dto.id}`,
        SK: `SUBSCRIPTION#SCHOOL#${dto.schoolId}`,
        schoolName: dto.schoolName,
        schoolRegion: dto.schoolRegion,
      },
    });

    return { affectedId: dto.id };
  }

  public async getSchool(schoolId: string): Promise<GetSchoolResult> {
    const school = await this.dynamodb.getItem({
      TableName: 'Classting-v2',
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
    const subscriptions = await this.dynamodb.queryItems({
      TableName: 'Classting-v2',
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
      TableName: 'Classting-v2',
      Key: {
        PK: `STUDENT#${dto.id}`,
        SK: `SUBSCRIPTION#SCHOOL#${dto.schoolId}`,
      },
    });

    return { affectedId: dto.id };
  }

  public async getNewsListBySchoolId(
    schoolId: string,
  ): Promise<GetSchoolWithNewsResult> {
    const schoolWithNewsList = await this.dynamodb.queryItems({
      TableName: 'Classting-v2',
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
