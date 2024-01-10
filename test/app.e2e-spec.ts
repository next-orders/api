import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/app.module';
import { CreateChannelDto } from '@/core/channel/dto/create-channel.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  describe('/health', () => {
    it('Should return ok status', async () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect(200)
        .expect(({ body }) => {
          expect(body.ok).toBeDefined();
          expect(body.ok).toEqual(true);
        });
    });
  });

  describe('/version', () => {
    it('Should return API version', async () => {
      return request(app.getHttpServer())
        .get('/version')
        .expect(200)
        .expect(({ body }) => {
          expect(body.ok).toBeDefined();
          expect(body.ok).toEqual(true);
          expect(body.version).toBeDefined();
        });
    });
  });

  describe('/channel', () => {
    describe('Creating new Channel', () => {
      const newChannelDto: CreateChannelDto = {
        slug: 'test',
        name: 'test',
        currencyCode: '',
        languageCode: '',
        countryCode: '',
      };

      it('Should return 401 Unauthorized', async () => {
        const response = await request(app.getHttpServer())
          .post('/channel')
          .send({})
          .set('Accept', 'application/json');

        expect(response.status).toEqual(401);
      });

      describe('Authorized', () => {
        const newEmployee = {
          firstName: 'Tester',
        };
        let employeeId = '';
        let bearerToken = '';

        beforeAll(async () => {
          // Create Employee
          const employee = await request(app.getHttpServer())
            .post('/employee')
            .send(newEmployee);

          expect(employee.body).toHaveProperty('ok', true);
          expect(employee.body).toHaveProperty('result.id');

          employeeId = employee.body.result.id;

          // Create Employee Contact
          const contact = await request(app.getHttpServer())
            .post('/employee/contact')
            .send({
              employeeId,
              type: 'EMAIL',
              value: 'tester@test.com',
              isUsedForAuthentication: true,
            });

          expect(contact.body).toHaveProperty('ok', true);

          // Sign In to get Bearer Token
          bearerToken = 'Bearer XXX';
        });

        it('Should return 403 on creating new Channel with bad data', async () => {
          const response = await request(app.getHttpServer())
            .post('/channel')
            .send({})
            .set('Accept', 'application/json')
            .set('Authorization', bearerToken);

          expect(response.status).toEqual(201);
        });

        it('Should return 201 on creating new Channel with good data', async () => {
          const response = await request(app.getHttpServer())
            .post('/channel')
            .send(newChannelDto)
            .set('Accept', 'application/json')
            .set('Authorization', bearerToken);

          expect(response.status).toEqual(201);
        });
      });
    });

    it('Should return all Channels', async () => {
      return request(app.getHttpServer())
        .get('/channel/list')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toBeDefined();
        });
    });
  });
});
