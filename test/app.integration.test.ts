import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import request, { Response } from 'supertest';

import { INestApplication } from '@nestjs/common';

import { Test, TestingModule } from '@nestjs/testing';
import { AppValidationPipe } from '../src/app.validation.pipe';
import { AppResponseInterceptor } from '../src/app.interceptor';
import { AppModule } from '../src/app.module';

describe('App Integration Test', () => {
  let app: INestApplication;
  let schoolId: string;
  let newsId: string;
  const studentId: string = '1234-1234-1234-1234';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new AppValidationPipe());
    app.useGlobalInterceptors(new AppResponseInterceptor());

    await app.init();
  });

  it('POST /school', async () => {
    const response: Response = await request(app.getHttpServer())
      .post('/school')
      .send({
        name: 'school name',
        region: 'school region',
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');

    const data = response.body.data;
    expect(data).toHaveProperty('affectedId');

    const affectedId = data.affectedId;
    expect(typeof affectedId).toEqual('string');

    schoolId = affectedId;
  });

  it('POST /school/:id/news', async () => {
    const response: Response = await request(app.getHttpServer())
      .post(`/school/${schoolId}/news`)
      .send({
        title: 'news name',
        content: 'news content',
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');

    const data = response.body.data;
    expect(data).toHaveProperty('affectedId');

    const affectedId = data.affectedId;
    expect(typeof affectedId).toEqual('string');

    newsId = affectedId;
  });

  it('PUT /school/:id/news/:newsId', async () => {
    const response: Response = await request(app.getHttpServer())
      .put(`/school/${schoolId}/news/${newsId}`)
      .send({
        title: 'news name',
        content: 'news content',
      });

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');

    const data = response.body.data;
    expect(data).toHaveProperty('affectedId');

    const affectedId = data.affectedId;
    expect(typeof affectedId).toEqual('string');
  });

  it('DELETE /school/:id/news/:newsId', async () => {
    const response: Response = await request(app.getHttpServer()).delete(
      `/school/${schoolId}/news/${newsId}`,
    );

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');

    const data = response.body.data;
    expect(data).toHaveProperty('affectedId');

    const affectedId = data.affectedId;
    expect(typeof affectedId).toEqual('string');
  });

  it('POST /student/:id/school/:schoolId/subscription', async () => {
    const response: Response = await request(app.getHttpServer())
      .post(`/student/${studentId}/school/${schoolId}/subscription`)
      .send({
        id: studentId,
        schoolId: schoolId,
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');

    const data = response.body.data;
    expect(data).toHaveProperty('affectedId');

    const affectedId = data.affectedId;
    expect(typeof affectedId).toEqual('string');
  });

  it('GET /student/:id/subscription/list', async () => {
    const response: Response = await request(app.getHttpServer()).get(
      `/student/${studentId}/subscription/list`,
    );

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');

    const data = response.body.data;
    expect(data).toHaveProperty('id');
    expect(typeof data.id).toEqual('string');

    expect(data).toHaveProperty('schoolList');

    const schoolList = data.schoolList;
    expect(schoolList).toBeInstanceOf(Array);

    schoolList.forEach((school) => {
      expect(school).toHaveProperty('schoolId');
      expect(school).toHaveProperty('schoolName');
      expect(school).toHaveProperty('schoolRegion');

      expect(typeof school.schoolId).toEqual('string');
      expect(typeof school.schoolName).toEqual('string');
      expect(typeof school.schoolRegion).toEqual('string');
    });
  });

  it('GET /student/:id/school/all/news/list', async () => {
    const response: Response = await request(app.getHttpServer()).get(
      `/student/${studentId}/school/all/news/list`,
    );

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');

    const data = response.body.data;
    expect(data).toBeInstanceOf(Array);

    data.forEach((schoolWithNews) => {
      expect(schoolWithNews).toHaveProperty('school');
      expect(schoolWithNews).toHaveProperty('newsList');

      const school = schoolWithNews.school;
      expect(school).toHaveProperty('id');
      expect(school).toHaveProperty('name');
      expect(school).toHaveProperty('region');

      expect(typeof school.id).toEqual('string');
      expect(typeof school.name).toEqual('string');
      expect(typeof school.region).toEqual('string');

      const newsList = schoolWithNews.newsList;
      expect(newsList).toBeInstanceOf(Array);

      newsList.forEach((news) => {
        expect(news).toHaveProperty('id');
        expect(news).toHaveProperty('title');
        expect(news).toHaveProperty('content');
        expect(news).toHaveProperty('createdAt');

        expect(typeof news.id).toEqual('string');
        expect(typeof news.title).toEqual('string');
        expect(typeof news.content).toEqual('string');
        expect(typeof news.createdAt).toEqual('number');
      });
    });
  });

  it('GET /student/:id/school/:schoolId/news/list', async () => {
    const response: Response = await request(app.getHttpServer()).get(
      `/student/${studentId}/school/${schoolId}/news/list`,
    );

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');

    const data = response.body.data;
    expect(data).toHaveProperty('school');
    expect(data).toHaveProperty('newsList');

    const school = data.school;
    expect(school).toHaveProperty('id');
    expect(school).toHaveProperty('name');
    expect(school).toHaveProperty('region');

    expect(typeof school.id).toEqual('string');
    expect(typeof school.name).toEqual('string');
    expect(typeof school.region).toEqual('string');

    const newsList = data.newsList;
    expect(newsList).toBeInstanceOf(Array);

    newsList.forEach((news) => {
      expect(news).toHaveProperty('id');
      expect(news).toHaveProperty('title');
      expect(news).toHaveProperty('content');
      expect(news).toHaveProperty('createdAt');

      expect(typeof news.id).toEqual('string');
      expect(typeof news.title).toEqual('string');
      expect(typeof news.content).toEqual('string');
      expect(typeof news.createdAt).toEqual('number');
    });
  });

  it('DELETE /student/:id/school/:schoolId/subscription', async () => {
    const response: Response = await request(app.getHttpServer()).delete(
      `/student/${studentId}/school/${schoolId}/subscription`,
    );

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('data');

    const data = response.body.data;
    expect(data).toHaveProperty('affectedId');

    const affectedId = data.affectedId;
    expect(typeof affectedId).toEqual('string');
  });
});
