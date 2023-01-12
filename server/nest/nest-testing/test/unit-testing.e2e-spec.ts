import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UnitTestingService } from '../src/modules/unit-testing/unit-testing.service';

describe('UnitTestingController (e2e)', () => {
  let app: INestApplication;
  let unitTestingService = { findAll: () => ['unit', 'testing', 'service'] };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UnitTestingService)
      .useValue(unitTestingService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('/unit-testing (GET)', () => {
    return request(app.getHttpServer())
      .get('/unit-testing')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(unitTestingService.findAll());
  });

  afterAll(async () => {
    await app.close();
  });
});
