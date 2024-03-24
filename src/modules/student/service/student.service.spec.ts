import { Test, TestingModule } from '@nestjs/testing';
import { DATE_UTIL } from '../../../libs/date-util/symbol/date-util.symbol';
import { DateUtil } from '../../../libs/date-util/date-util';
import { DYNAMODB } from '../../../libs/dynamodb/symbol/dynamodb-manager.symbol';
import { StudentServiceInterface } from './student.service.interface';
import { StudentRepositoryInterface } from '../repository/student.repository.interface';
import { STUDENT_REPOSITORY, STUDENT_SERVICE } from '../symbol/student.symbol';
import { NotFoundException } from '@nestjs/common';
import { StudentService } from './student.service';

describe('StudentService Unit Test', () => {
  let studentService: StudentServiceInterface;
  let studentRepository: StudentRepositoryInterface;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: STUDENT_SERVICE,
          useClass: StudentService,
        },
        {
          provide: STUDENT_REPOSITORY,
          useValue: {
            createSubscription: jest.fn(),
            getSchool: jest.fn(),
            getSubscriptionList: jest.fn(),
            deleteSubscription: jest.fn(),
            getSchoolWithNewsList: jest.fn(),
          },
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

    studentService =
      moduleFixture.get<StudentServiceInterface>(STUDENT_SERVICE);
    studentRepository =
      moduleFixture.get<StudentRepositoryInterface>(STUDENT_REPOSITORY);
  });

  it('service가 정의되어 있어야만 한다.', () => {
    expect(studentService).toBeDefined();
  });

  describe('addSubscription', () => {
    const id = 'student id';
    const schoolId = 'school id';

    it('addSubscription이 정의되어 있어야만 한다.', () => {
      expect(studentService.addSubscription).toBeDefined();
    });

    it('addSubscription을 호출할 때, 학교가 존재하지 않는다면 NotFoundException이 발생해야만 한다.', async () => {
      jest
        .spyOn(studentRepository, 'getSchool')
        .mockResolvedValueOnce(undefined);

      try {
        await studentService.addSubscription({ id, schoolId });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('addSubscription이 호출되면 repository의 createSubscription이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      jest.spyOn(studentRepository, 'getSchool').mockResolvedValueOnce({
        schoolId: 'school id',
        name: 'school name',
        region: 'school region',
      });
      const createSubscriptionSpy = jest.spyOn(
        studentRepository,
        'createSubscription',
      );

      await studentService.addSubscription({ id, schoolId });

      expect(createSubscriptionSpy).toBeCalledWith({
        id,
        schoolId,
        schoolName: expect.any(String),
        schoolRegion: expect.any(String),
      });
    });

    it('addSubscription이 호출되면 AddSubscriptionResult를 반환해야만 한다.', async () => {
      const repositoryResult = { affectedId: 'id' };

      jest.spyOn(studentRepository, 'getSchool').mockResolvedValueOnce({
        schoolId: 'school id',
        name: 'school name',
        region: 'school region',
      });

      jest
        .spyOn(studentRepository, 'createSubscription')
        .mockResolvedValueOnce(repositoryResult);

      const result = await studentService.addSubscription({ id, schoolId });

      expect(result).toHaveProperty('affectedId');
    });
  });

  describe('findSubscriptionList', () => {
    const id = 'student id';

    it('findSubscriptionList가 정의되어 있어야만 한다.', () => {
      expect(studentService.findSubscriptionList).toBeDefined();
    });

    it('findSubscriptionList이 호출되면 repository의 getSubscriptionList가 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const getSubscriptionListSpy = jest
        .spyOn(studentRepository, 'getSubscriptionList')
        .mockResolvedValue([]);

      await studentService.findSubscriptionList(id);

      expect(getSubscriptionListSpy).toBeCalledWith(id);
    });

    it('findSubscriptionList이 호출되면 FindSubscriptionListResult를 반환해야만 한다.', async () => {
      const repositoryResult = [
        {
          id: 'id',
          schoolId: 'school id',
          schoolName: 'school name',
          schoolRegion: 'school region',
        },
      ];

      jest
        .spyOn(studentRepository, 'getSubscriptionList')
        .mockResolvedValueOnce(repositoryResult);

      const result = await studentService.findSubscriptionList(id);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('schoolList');

      const schoolList = result.schoolList;

      schoolList.forEach((school) => {
        expect(school).toHaveProperty('schoolId');
        expect(school).toHaveProperty('schoolName');
        expect(school).toHaveProperty('schoolRegion');
      });
    });
  });

  describe('deleteSubscription', () => {
    const id = 'student id';
    const schoolId = 'school id';

    it('deleteSubscription이 정의되어 있어야만 한다.', () => {
      expect(studentService.deleteSubscription).toBeDefined();
    });

    it('deleteSubscription을 호출할 때, 학교가 존재하지 않는다면 NotFoundException이 발생해야만 한다.', async () => {
      jest
        .spyOn(studentRepository, 'getSchool')
        .mockResolvedValueOnce(undefined);

      try {
        await studentService.deleteSubscription({ id, schoolId });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('deleteSubscription이 호출되면 repository의 deleteSubscription이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      jest.spyOn(studentRepository, 'getSchool').mockResolvedValueOnce({
        schoolId: 'school id',
        name: 'school name',
        region: 'school region',
      });

      const deleteSubscriptionSpy = jest.spyOn(
        studentRepository,
        'deleteSubscription',
      );

      await studentService.deleteSubscription({ id, schoolId });

      expect(deleteSubscriptionSpy).toBeCalledWith({ id, schoolId });
    });

    it('deleteSubscription이 호출되면 DeleteSubscriptionResult를 반환해야만 한다.', async () => {
      const repositoryResult = { affectedId: 'id' };

      jest.spyOn(studentRepository, 'getSchool').mockResolvedValueOnce({
        schoolId: 'school id',
        name: 'school name',
        region: 'school region',
      });

      jest
        .spyOn(studentRepository, 'deleteSubscription')
        .mockResolvedValueOnce(repositoryResult);

      const result = await studentService.deleteSubscription({ id, schoolId });

      expect(result).toHaveProperty('affectedId');
    });
  });

  describe('findSchoolWithNewsList', () => {
    const schoolId = 'school id';

    it('findSchoolWithNewsList가 정의되어 있어야만 한다.', () => {
      expect(studentService.findSchoolWithNewsList).toBeDefined();
    });

    it('findSchoolWithNewsList이 호출되면 repository의 getSchoolWithNewsList가 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const getSchoolWithNewsListSpy = jest
        .spyOn(studentRepository, 'getSchoolWithNewsList')
        .mockResolvedValue({
          school: { id: 'id', name: 'name', region: 'region' },
          newsList: [],
        });

      await studentService.findSchoolWithNewsList(schoolId);

      expect(getSchoolWithNewsListSpy).toBeCalledWith(schoolId);
    });

    it('findSchoolWithNewsList이 호출되면 FindSchoolWithNewsListResult를 반환해야만 한다.', async () => {
      const repositoryResult = {
        school: { id: 'id', name: 'name', region: 'region' },
        newsList: [{ id: 'id', title: 'title', content: 'content' }],
      };

      jest
        .spyOn(studentRepository, 'getSchoolWithNewsList')
        .mockResolvedValueOnce(repositoryResult);

      const result = await studentService.findSchoolWithNewsList(schoolId);

      expect(result).toHaveProperty('school');
      expect(result).toHaveProperty('newsList');

      const newsList = result.newsList;

      newsList.forEach((news) => {
        expect(news).toHaveProperty('id');
        expect(news).toHaveProperty('title');
        expect(news).toHaveProperty('content');
      });
    });
  });

  describe('findAllSubscriptionSchoolWithNewsList', () => {
    const id = 'student id';

    it('findAllSubscriptionSchoolWithNewsList가 정의되어 있어야만 한다.', () => {
      expect(
        studentService.findAllSubscriptionSchoolWithNewsList,
      ).toBeDefined();
    });

    it('findAllSubscriptionSchoolWithNewsList이 호출되면 repository의 getSubscriptionList가 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const getSubscriptionListSpy = jest
        .spyOn(studentRepository, 'getSubscriptionList')
        .mockResolvedValue([]);

      await studentService.findAllSubscriptionSchoolWithNewsList(id);

      expect(getSubscriptionListSpy).toBeCalledWith(id);
    });

    it('findAllSubscriptionSchoolWithNewsList이 호출됐을 때 subscriptionList가 없다면 빈 배열을 반환해야만 한다.', async () => {
      jest
        .spyOn(studentRepository, 'getSubscriptionList')
        .mockResolvedValueOnce([]);

      const result = await studentService.findAllSubscriptionSchoolWithNewsList(
        id,
      );

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
    });

    it('findAllSubscriptionSchoolWithNewsList이 호출되면 FindSchoolWithNewsListResult[]를 반환해야만 한다.', async () => {
      jest
        .spyOn(studentRepository, 'getSubscriptionList')
        .mockResolvedValueOnce([
          {
            id: 'id',
            schoolId: 'school id',
            schoolName: 'school name',
            schoolRegion: 'school region',
          },
        ]);

      const repositoryResult = {
        school: { id: 'id', name: 'name', region: 'region' },
        newsList: [{ id: 'id', title: 'title', content: 'content' }],
      };

      jest
        .spyOn(studentRepository, 'getSchoolWithNewsList')
        .mockResolvedValueOnce(repositoryResult);

      const result = await studentService.findAllSubscriptionSchoolWithNewsList(
        id,
      );

      expect(result).toBeInstanceOf(Array);

      result.forEach((schoolWithNews) => {
        expect(schoolWithNews).toHaveProperty('school');
        expect(schoolWithNews).toHaveProperty('newsList');

        const school = schoolWithNews.school;
        expect(school).toHaveProperty('id');
        expect(school).toHaveProperty('name');
        expect(school).toHaveProperty('region');

        const newsList = schoolWithNews.newsList;
        newsList.forEach((news) => {
          expect(news).toHaveProperty('id');
          expect(news).toHaveProperty('title');
          expect(news).toHaveProperty('content');
        });
      });
    });
  });
});
