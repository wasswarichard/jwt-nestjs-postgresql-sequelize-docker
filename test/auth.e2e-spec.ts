import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../src/users/models/user.model';
import { AuthModule } from '../src/auth/auth.module';
import { UsersService } from '../src/users/users.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  const user = {
    dataValues: {
      id: 1,
      username: 'test',
      password: 'password',
      name: 'test',
    },
    validatePassword: jest.fn().mockImplementation((password) => true),
  };
  const mockUserModel = {
    findOne: jest.fn().mockImplementation((dto) => dto),
  };
  const mockUsersService = {
    findByUsername: jest.fn().mockImplementation((_) => user),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockUserModel)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'demo',
        password: 'password',
      })
      .expect(201);
  });
});
