import { Test, TestingModule } from '@nestjs/testing';
import { SCHOOL_REPOSITORY, SCHOOL_SERVICE } from '../symbol/school.symbol';
import { DATE_UTIL } from '../../../libs/date-util/symbol/date-util.symbol';
import { DateUtil } from '../../../libs/date-util/date-util';
import { DYNAMODB } from '../../../libs/dynamodb/symbol/dynamodb-manager.symbol';
import { SchoolRepositoryInterface } from '../repository/school.repository.interface';
import { SchoolService } from './school.service';
import { SchoolServiceInterface } from './school.service.interface';
import { NotFoundException } from '@nestjs/common';

describe('SchoolService Unit Test', () => {
  let schoolService: SchoolServiceInterface;
  let schoolRepository: SchoolRepositoryInterface;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SCHOOL_SERVICE,
          useClass: SchoolService,
        },
        {
          provide: SCHOOL_REPOSITORY,
          useValue: {
            createSchool: jest.fn(),
            createNews: jest.fn(),
            getSchool: jest.fn(),
            getNews: jest.fn(),
            updateNews: jest.fn(),
            deleteNews: jest.fn(),
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

    schoolService = moduleFixture.get<SchoolServiceInterface>(SCHOOL_SERVICE);
    schoolRepository =
      moduleFixture.get<SchoolRepositoryInterface>(SCHOOL_REPOSITORY);
  });

  it('service가 정의되어 있어야만 한다.', () => {
    expect(schoolService).toBeDefined();
  });

  describe('addSchool', () => {
    const name = 'school name';
    const region = 'school region';

    it('addSchool이 정의되어 있어야만 한다.', async () => {
      expect(schoolService.addSchool).toBeDefined();
    });

    it('addSchool이 호출되면 repository의 createSchool이 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      const createSchoolSpy = jest.spyOn(schoolRepository, 'createSchool');

      await schoolService.addSchool({ name, region });

      expect(createSchoolSpy).toBeCalledWith({ name, region });
    });

    it('addSchool이 호출되면 AddSchoolResult를 반환해야만 한다.', async () => {
      const repositoryResult = { affectedId: 'id' };
      jest
        .spyOn(schoolRepository, 'createSchool')
        .mockResolvedValue(repositoryResult);

      const result = await schoolService.addSchool({ name, region });

      expect(result).toHaveProperty('affectedId');
    });
  });

  describe('addNews', () => {
    const id = 'school id';
    const title = 'news title';
    const content = 'news content';

    it('addNews가 정의되어 있어야만 한다.', async () => {
      expect(schoolService.addNews).toBeDefined();
    });

    it('addNews 호출 시, 뉴스를 생성하려는 학교가 없다면 NotFoundException이 발생해야만 한다.', async () => {
      jest
        .spyOn(schoolRepository, 'getSchool')
        .mockResolvedValueOnce(undefined);

      try {
        await schoolService.addNews({ id, title, content });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('addNews가 호출되면 repository의 createNews가 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      jest.spyOn(schoolRepository, 'getSchool').mockResolvedValueOnce({
        id: 'school id',
        name: 'name',
        region: 'region',
      });
      const createNewsSpy = jest.spyOn(schoolRepository, 'createNews');

      await schoolService.addNews({ id, title, content });

      expect(createNewsSpy).toBeCalledWith({ id, title, content });
    });

    it('addNews가 호출되면 AddNewsResult를 반환해야만 한다.', async () => {
      const repositoryResult = { affectedId: 'id' };

      jest.spyOn(schoolRepository, 'getSchool').mockResolvedValueOnce({
        id: 'school id',
        name: 'name',
        region: 'region',
      });

      jest
        .spyOn(schoolRepository, 'createNews')
        .mockResolvedValue(repositoryResult);

      const result = await schoolService.addNews({ id, title, content });

      expect(result).toHaveProperty('affectedId');
    });
  });

  describe('modifyNews', () => {
    const id = 'school id';
    const newsId = 'news id';
    const title = 'news title';
    const content = 'news content';

    it('modifyNews가 정의되어 있어야만 한다.', async () => {
      expect(schoolService.modifyNews).toBeDefined();
    });

    it('modifyNews 호출 시, 뉴스가 없다면 NotFoundException이 발생해야만 한다.', async () => {
      jest.spyOn(schoolRepository, 'getNews').mockResolvedValueOnce(undefined);

      try {
        await schoolService.modifyNews({ id, newsId, title, content });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('modifyNews가 호출되면 repository의 updateNews가 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      jest.spyOn(schoolRepository, 'getNews').mockResolvedValueOnce({
        id: 'school id',
        newsId: 'news id',
        title: 'title',
        content: 'content',
      });
      const updateNewsSpy = jest.spyOn(schoolRepository, 'updateNews');

      await schoolService.modifyNews({ id, newsId, title, content });

      expect(updateNewsSpy).toBeCalledWith({ id, newsId, title, content });
    });

    it('modifyNews가 호출되면 ModifyNewsResult를 반환해야만 한다.', async () => {
      const repositoryResult = { affectedId: 'id' };

      jest.spyOn(schoolRepository, 'getNews').mockResolvedValueOnce({
        id: 'school id',
        newsId: 'news id',
        title: 'title',
        content: 'content',
      });

      jest
        .spyOn(schoolRepository, 'updateNews')
        .mockResolvedValue(repositoryResult);

      const result = await schoolService.modifyNews({
        id,
        newsId,
        title,
        content,
      });

      expect(result).toHaveProperty('affectedId');
    });
  });

  describe('removeNews', () => {
    const id = 'school id';
    const newsId = 'news id';

    it('removeNews가 정의되어 있어야만 한다.', async () => {
      expect(schoolService.removeNews).toBeDefined();
    });

    it('removeNews 호출 시, 뉴스가 없다면 NotFoundException이 발생해야만 한다.', async () => {
      jest.spyOn(schoolRepository, 'getNews').mockResolvedValueOnce(undefined);

      try {
        await schoolService.removeNews({ id, newsId });
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    });

    it('removeNews가 호출되면 repository의 deleteNews가 알맞는 인자값과 함께 호출되어야 한다.', async () => {
      jest.spyOn(schoolRepository, 'getNews').mockResolvedValueOnce({
        id: 'school id',
        newsId: 'news id',
        title: 'title',
        content: 'content',
      });
      const deleteNewsSpy = jest.spyOn(schoolRepository, 'deleteNews');

      await schoolService.removeNews({ id, newsId });

      expect(deleteNewsSpy).toBeCalledWith({ id, newsId });
    });

    it('removeNews가 호출되면 RemoveNewsResult를 반환해야만 한다.', async () => {
      const repositoryResult = { affectedId: 'id' };

      jest.spyOn(schoolRepository, 'getNews').mockResolvedValueOnce({
        id: 'school id',
        newsId: 'news id',
        title: 'title',
        content: 'content',
      });

      jest
        .spyOn(schoolRepository, 'deleteNews')
        .mockResolvedValue(repositoryResult);

      const result = await schoolService.removeNews({ id, newsId });

      expect(result).toHaveProperty('affectedId');
    });
  });
});
