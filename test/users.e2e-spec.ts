import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UsersModule } from '../src/users/users.module';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../src/users/models/user.model';
import { AuthModule } from '../src/auth/auth.module';
import { UsersService } from '../src/users/users.service';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  let authToken: string; // Store the bearer token for use in the test

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
    findOne: jest.fn().mockImplementation((dto) => dto),
    findAll: jest.fn().mockImplementation((dto) => []),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AuthModule],
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockUserModel)
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // Simulate user login or token generation and store the token
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        username: 'john',
        password: 'password',
      });
    authToken = `Bearer ${loginResponse.body.access_token}`;
  });

  it('/users (GET) should return 401 unauthorized', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect('Content-Type', /json/)
      .expect(401);
  });

  it('/users (GET) should return users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .set('Authorization', authToken)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
