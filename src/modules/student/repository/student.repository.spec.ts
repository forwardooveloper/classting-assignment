import { Test, TestingModule } from '@nestjs/testing';
import { DATE_UTIL } from '../../../libs/date-util/symbol/date-util.symbol';
import { DateUtil } from '../../../libs/date-util/date-util';
import { DYNAMODB } from '../../../libs/dynamodb/symbol/dynamodb-manager.symbol';
import { DynamodbInterface } from 'src/libs/dynamodb/dynamodb.interface';
import { StudentRepositoryInterface } from './student.repository.interface';
import { STUDENT_REPOSITORY } from '../symbol/student.symbol';
import { StudentRepository } from './student.repository';

describe('SchoolRepository Unit Test', () => {
  let studentRepository: StudentRepositoryInterface;
  let dynamodb: DynamodbInterface;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: STUDENT_REPOSITORY,
          useClass: StudentRepository,
        },
        {
          provide: DYNAMODB,
          useValue: {
            putItem: jest.fn(),
            updateItem: jest.fn(),
            deleteItem: jest.fn(),
            getItem: jest.fn(),
            query: jest.fn(),
          },
        },
        {
          provide: DATE_UTIL,
          useClass: DateUtil,
        },
      ],
    }).compile();

    studentRepository =
      moduleFixture.get<StudentRepositoryInterface>(STUDENT_REPOSITORY);
    dynamodb = moduleFixture.get<DynamodbInterface>(DYNAMODB);
  });

  it('repository가 정의되어 있어야만 한다.', () => {
    expect(studentRepository).toBeDefined();
  });

  describe('createSubscription', () => {
    const id = 'id';
    const schoolId = 'schoolId';
    const schoolName = 'schoolName';
    const schoolRegion = 'schoolRegion';

    it('createSubscription이 정의되어 있어야만 한다.', async () => {
      expect(studentRepository.createSubscription).toBeDefined();
    });

    it('createSubscription이 호출되면 dynamodb의 putItem이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const putItemSpy = jest.spyOn(dynamodb, 'putItem');

      await studentRepository.createSubscription({
        id,
        schoolId,
        schoolName,
        schoolRegion,
      });

      expect(putItemSpy).toBeCalledWith({
        TableName: 'Classting-v2',
        Item: {
          PK: `STUDENT#${id}`,
          SK: `SUBSCRIPTION#SCHOOL#${schoolId}`,
          schoolName,
          schoolRegion,
        },
      });
    });

    it('createSubscription이 호출되면 affectedId가 반환되어야만 한다.', async () => {
      const result = await studentRepository.createSubscription({
        id,
        schoolId,
        schoolName,
        schoolRegion,
      });

      expect(result.affectedId).toBeDefined();
    });
  });

  describe('getSchool', () => {
    const schoolId = 'schoolId';

    it('getSchool이 정의되어 있어야만 한다.', async () => {
      expect(studentRepository.getSchool).toBeDefined();
    });

    it('getSchool이 호출되면 dynamodb의 getItem이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const getItemSpy = jest.spyOn(dynamodb, 'getItem').mockResolvedValueOnce({
        Item: {
          name: 'name',
          region: 'region',
        },
        $metadata: {},
      });

      await studentRepository.getSchool(schoolId);

      expect(getItemSpy).toBeCalledWith({
        TableName: 'Classting-v2',
        Key: {
          PK: `SCHOOL#${schoolId}`,
          SK: 'METADATA',
        },
      });
    });

    it('getSchool이 호출됐을 때, school 정보가 있다면 GetSchoolResult를 반환해야만 한다.', async () => {
      const name = 'school name';
      const region = 'school region';

      jest.spyOn(dynamodb, 'getItem').mockResolvedValueOnce({
        Item: { name, region },
        $metadata: {},
      });
      const result = await studentRepository.getSchool(schoolId);

      expect(result.schoolId).toEqual(schoolId);
      expect(result.name).toEqual(name);
      expect(result.region).toEqual(region);
    });

    it('getSchool이 호출됐을 때, school 정보가 없다면 undefined 반환해야만 한다.', async () => {
      jest.spyOn(dynamodb, 'getItem').mockResolvedValueOnce({
        $metadata: {},
      });
      const result = await studentRepository.getSchool(schoolId);

      expect(result).toBeUndefined();
    });
  });

  describe('getSubscriptionList', () => {
    const id = 'id';

    it('getSubscriptionList이 정의되어 있어야만 한다.', async () => {
      expect(studentRepository.getSubscriptionList).toBeDefined();
    });

    it('getSubscriptionList이 호출되면 dynamodb의 query가 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const querySpy = jest.spyOn(dynamodb, 'query').mockResolvedValueOnce({
        Items: [],
        $metadata: {},
      });

      await studentRepository.getSubscriptionList(id);

      expect(querySpy).toBeCalledWith({
        TableName: 'Classting-v2',
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': `STUDENT#${id}`,
        },
      });
    });

    it('getSubscriptionList이 호출됐을 때, subscription 정보가 있다면 GetSubscriptionListResult를 반환해야만 한다.', async () => {
      const schoolName = 'schoolName';
      const schoolRegion = 'schoolRegion';

      jest.spyOn(dynamodb, 'query').mockResolvedValueOnce({
        Items: [
          {
            SK: 'SUBSCRIPTION#SCHOOL#schoolId',
            schoolName,
            schoolRegion,
          },
        ],
        $metadata: {},
      });
      const resultList = await studentRepository.getSubscriptionList(id);

      resultList.forEach((result) => {
        expect(result.id).toEqual(id);
        expect(result.schoolId).toBeDefined();
        expect(result.schoolName).toEqual(schoolName);
        expect(result.schoolRegion).toEqual(schoolRegion);
      });
    });

    it('getSubscriptionList이 호출됐을 때, subscription 정보가 없다면 빈 배열을 반환해야만 한다.', async () => {
      jest.spyOn(dynamodb, 'query').mockResolvedValueOnce({
        $metadata: {},
      });
      const result = await studentRepository.getSubscriptionList(id);

      expect(result).toEqual([]);
    });
  });

  describe('deleteSubscription', () => {
    const id = 'id';
    const schoolId = 'schoolId';

    it('deleteSubscription이 정의되어 있어야만 한다.', async () => {
      expect(studentRepository.deleteSubscription).toBeDefined();
    });

    it('deleteSubscription이 호출되면 dynamodb의 deleteItem이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const deleteItemSpy = jest.spyOn(dynamodb, 'deleteItem');

      await studentRepository.deleteSubscription({ id, schoolId });

      expect(deleteItemSpy).toBeCalledWith({
        TableName: 'Classting-v2',
        Key: {
          PK: `STUDENT#${id}`,
          SK: `SUBSCRIPTION#SCHOOL#${schoolId}`,
        },
      });
    });

    it('deleteSubscription이 호출되면 affectedId가 반환되어야만 한다.', async () => {
      const result = await studentRepository.deleteSubscription({
        id,
        schoolId,
      });

      expect(result.affectedId).toBeDefined();
    });
  });

  describe('getSchoolWithNewsList', () => {
    const schoolId = 'schoolId';

    it('getSchoolWithNewsList이 정의되어 있어야만 한다.', async () => {
      expect(studentRepository.getSchoolWithNewsList).toBeDefined();
    });

    it('getSchoolWithNewsList이 호출되면 dynamodb의 query가 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const querySpy = jest.spyOn(dynamodb, 'query').mockResolvedValueOnce({
        $metadata: {},
      });

      await studentRepository.getSchoolWithNewsList(schoolId);

      expect(querySpy).toBeCalledWith({
        TableName: 'Classting-v2',
        IndexName: 'CreatedAtSort',
        KeyConditionExpression: 'PK = :pk',
        ExpressionAttributeValues: {
          ':pk': `SCHOOL#${schoolId}`,
        },
        ScanIndexForward: false,
      });
    });

    it('getSchoolWithNewsList이 호출됐을 때, school 정보와 news 정보가 있다면 GetSchoolWithNewsListResult를 반환해야만 한다.', async () => {
      jest.spyOn(dynamodb, 'query').mockResolvedValueOnce({
        Items: [
          {
            PK: `SCHOOL#${schoolId}`,
            SK: 'METADATA',
            name: 'name',
            region: 'region',
          },
          {
            PK: `SCHOOL#${schoolId}`,
            SK: 'NEWS#newsId',
            title: 'title',
            content: 'content',
          },
        ],
        $metadata: {},
      });
      const result = await studentRepository.getSchoolWithNewsList(schoolId);

      expect(result.school).toBeDefined();
      expect(result.newsList).toBeDefined();

      const school = result.school;
      const newsList = result.newsList;

      expect(school.id).toEqual(schoolId);
      expect(school.name).toBeDefined();
      expect(school.region).toBeDefined();

      newsList.forEach((news) => {
        expect(news.id).toBeDefined();
        expect(news.title).toBeDefined();
        expect(news.content).toBeDefined();
      });
    });

    it('getSchoolWithNewsList이 호출됐을 때, school 정보와 news 정보가 없다면 undefined 반환해야만 한다.', async () => {
      jest.spyOn(dynamodb, 'query').mockResolvedValueOnce({
        $metadata: {},
      });
      const result = await studentRepository.getSchoolWithNewsList(schoolId);

      expect(result).toBeUndefined();
    });
  });
});
