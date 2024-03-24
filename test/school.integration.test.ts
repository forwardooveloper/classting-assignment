import request, { Response } from 'supertest';

import { INestApplication } from '@nestjs/common';

import { Test, TestingModule } from '@nestjs/testing';
import { AppValidationPipe } from '../src/app.validation.pipe';
import { AppResponseInterceptor } from '../src/app.interceptor';
import { AppModule } from '../src/app.module';

describe('School Integration Test', () => {
  let app: INestApplication;
  let schoolId: string;
  let newsId: string;

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
});
