import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SCHOOL_REPOSITORY } from '../symbol/school.symbol';
import { SchoolRepository } from './school.repository';
import { DATE_UTIL } from '../../../libs/date-util/symbol/date-util.symbol';
import { DateUtil } from '../../../libs/date-util/date-util';
import { DYNAMODB } from '../../../libs/dynamodb/symbol/dynamodb-manager.symbol';
import { DynamodbInterface } from '../../../libs/dynamodb/dynamodb.interface';
import { SchoolRepositoryInterface } from './school.repository.interface';
import configuration from '../../../config/configuration';

describe('SchoolRepository Unit Test', () => {
  let schoolRepository: SchoolRepositoryInterface;
  let dynamodb: DynamodbInterface;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      providers: [
        {
          provide: SCHOOL_REPOSITORY,
          useClass: SchoolRepository,
        },
        {
          provide: DYNAMODB,
          useValue: {
            putItem: jest.fn(),
            updateItem: jest.fn(),
            deleteItem: jest.fn(),
            getItem: jest.fn(),
          },
        },
        {
          provide: DATE_UTIL,
          useClass: DateUtil,
        },
      ],
    }).compile();

    schoolRepository =
      moduleFixture.get<SchoolRepositoryInterface>(SCHOOL_REPOSITORY);
    dynamodb = moduleFixture.get<DynamodbInterface>(DYNAMODB);
    configService = moduleFixture.get<ConfigService>(ConfigService);
  });

  it('repository가 정의되어 있어야만 한다.', () => {
    expect(schoolRepository).toBeDefined();
  });

  describe('createSchool', () => {
    const name = 'school name';
    const region = 'school region';

    it('createSchool이 정의되어 있어야만 한다.', async () => {
      expect(schoolRepository.createSchool).toBeDefined();
    });

    it('createSchool이 호출되면 dynamodb의 putItem이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const putItemSpy = jest.spyOn(dynamodb, 'putItem');

      await schoolRepository.createSchool({ name, region });

      expect(putItemSpy).toBeCalledWith({
        TableName: configService.get<string>('dynamodb.tableName'),
        Item: {
          PK: expect.any(String),
          SK: 'METADATA',
          name,
          region,
          createdAt: expect.any(Number),
        },
      });
    });

    it('createSchool이 호출되면 affectedId가 반환되어야만 한다.', async () => {
      const result = await schoolRepository.createSchool({ name, region });

      expect(result.affectedId).toBeDefined();
    });
  });

  describe('createNews', () => {
    const id = 'school id';
    const title = 'news title';
    const content = 'news content';
    it('createNews가 정의되어 있어야만 한다.', async () => {
      expect(schoolRepository.createNews).toBeDefined();
    });

    it('createNews가 호출되면 dynamodb의 putItem이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const putItemSpy = jest.spyOn(dynamodb, 'putItem');

      await schoolRepository.createNews({ id, title, content });

      expect(putItemSpy).toBeCalledWith({
        TableName: configService.get<string>('dynamodb.tableName'),
        Item: {
          PK: `SCHOOL#${id}`,
          SK: expect.any(String),
          title,
          content,
          createdAt: expect.any(Number),
          updatedAt: expect.any(Number),
        },
      });
    });

    it('createNews가 호출되면 affectedId가 반환되어야만 한다.', async () => {
      const result = await schoolRepository.createNews({ id, title, content });

      expect(result.affectedId).toBeDefined();
    });
  });

  describe('updateNews', () => {
    const id = 'school id';
    const newsId = 'news id';
    const title = 'news title';
    const content = 'news content';

    it('updateNews가 정의되어 있어야만 한다.', async () => {
      expect(schoolRepository.updateNews).toBeDefined();
    });

    it('updateNews가 호출되면 dynamodb의 updateItem이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const updateItemSpy = jest.spyOn(dynamodb, 'updateItem');

      await schoolRepository.updateNews({ id, newsId, title, content });

      expect(updateItemSpy).toBeCalledWith({
        TableName: configService.get<string>('dynamodb.tableName'),
        Key: {
          PK: `SCHOOL#${id}`,
          SK: `NEWS#${newsId}`,
        },
        UpdateExpression:
          'SET title = :title, content = :content, updatedAt = :updatedAt',
        ExpressionAttributeValues: {
          ':title': title,
          ':content': content,
          ':updatedAt': expect.any(Number),
        },
      });
    });

    it('updateNews가 호출되면 affectedId가 반환되어야만 한다.', async () => {
      const result = await schoolRepository.updateNews({
        id,
        newsId,
        title,
        content,
      });

      expect(result.affectedId).toBeDefined();
    });
  });

  describe('deleteNews', () => {
    const id = 'school id';
    const newsId = 'news id';

    it('deleteNews가 정의되어 있어야만 한다.', async () => {
      expect(schoolRepository.deleteNews).toBeDefined();
    });

    it('deleteNews가 호출되면 dynamodb의 deleteItem이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const deleteItemSpy = jest.spyOn(dynamodb, 'deleteItem');

      await schoolRepository.deleteNews({ id, newsId });

      expect(deleteItemSpy).toBeCalledWith({
        TableName: configService.get<string>('dynamodb.tableName'),
        Key: {
          PK: `SCHOOL#${id}`,
          SK: `NEWS#${newsId}`,
        },
      });
    });

    it('deleteNews가 호출되면 affectedId가 반환되어야만 한다.', async () => {
      const result = await schoolRepository.deleteNews({ id, newsId });

      expect(result.affectedId).toBeDefined();
    });
  });

  describe('getNews', () => {
    const id = 'school id';
    const newsId = 'news id';

    it('getNews가 정의되어 있어야만 한다.', async () => {
      expect(schoolRepository.getNews).toBeDefined();
    });

    it('getNews가 호출되면 dynamodb의 getItem이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const getItemSpy = jest.spyOn(dynamodb, 'getItem').mockResolvedValueOnce({
        Item: {
          title: 'title',
          content: 'content',
        },
        $metadata: {},
      });

      await schoolRepository.getNews({ id, newsId });

      expect(getItemSpy).toBeCalledWith({
        TableName: configService.get<string>('dynamodb.tableName'),
        Key: {
          PK: `SCHOOL#${id}`,
          SK: `NEWS#${newsId}`,
        },
      });
    });

    it('getNews가 호출됐을 때, news 정보가 GetNewsResult를 반환해야만 한다.', async () => {
      jest.spyOn(dynamodb, 'getItem').mockResolvedValueOnce({
        Item: {
          title: 'title',
          content: 'content',
        },
        $metadata: {},
      });
      const result = await schoolRepository.getNews({ id, newsId });

      expect(result.id).toEqual(id);
      expect(result.newsId).toEqual(newsId);
      expect(result.title).toBeDefined();
      expect(result.content).toBeDefined();
    });

    it('getNews가 호출됐을 때, news 정보가 없다면 undefined 반환해야만 한다.', async () => {
      jest.spyOn(dynamodb, 'getItem').mockResolvedValueOnce({
        $metadata: {},
      });
      const result = await schoolRepository.getNews({ id, newsId });

      expect(result).toBeUndefined();
    });
  });

  describe('getSchool', () => {
    const id = 'school id';

    it('getSchool이 정의되어 있어야만 한다.', async () => {
      expect(schoolRepository.getSchool).toBeDefined();
    });

    it('getSchool이 호출되면 dynamodb의 getItem이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const getItemSpy = jest.spyOn(dynamodb, 'getItem').mockResolvedValueOnce({
        Item: {
          name: 'name',
          region: 'region',
        },
        $metadata: {},
      });

      await schoolRepository.getSchool(id);

      expect(getItemSpy).toBeCalledWith({
        TableName: configService.get<string>('dynamodb.tableName'),
        Key: {
          PK: `SCHOOL#${id}`,
          SK: 'METADATA',
        },
      });
    });

    it('getSchool이 호출됐을 때, school 정보가 있다면 해당 정보를 반환해야만 한다.', async () => {
      jest.spyOn(dynamodb, 'getItem').mockResolvedValueOnce({
        Item: {
          name: 'name',
          region: 'region',
        },
        $metadata: {},
      });
      const result = await schoolRepository.getSchool(id);

      expect(result.id).toEqual(id);
      expect(result.name).toBeDefined();
      expect(result.region).toBeDefined();
    });

    it('getSchool이 호출됐을 때, school 정보가 없다면 undefined 반환해야만 한다.', async () => {
      jest.spyOn(dynamodb, 'getItem').mockResolvedValueOnce({
        $metadata: {},
      });
      const result = await schoolRepository.getSchool(id);

      expect(result).toBeUndefined();
    });
  });
});
