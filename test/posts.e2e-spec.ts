import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { PostsModule } from '../src/posts/posts.module';
import { AuthModule } from '../src/auth/auth.module';
import { UsersService } from '../src/users/users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../src/users/models/user.model';
import { Post } from '../src/posts/models/post.model';
import { Files } from '../src/posts/models/files.model';
import { PostsService } from '../src/posts/posts.service';

describe('PostsController (e2e)', () => {
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
  const mockPostsModel = {};
  const mockFilesModel = {};
  const mockUsersService = {
    findByUsername: jest.fn().mockImplementation((_) => user),
    findOne: jest.fn().mockImplementation((dto) => dto),
    findAll: jest.fn().mockImplementation((dto) => []),
  };
  const mockPostsService = {
    findAll: jest.fn().mockImplementation((dto) => []),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PostsModule, AuthModule],
    })
      .overrideProvider(getModelToken(User))
      .useValue(mockUserModel)
      .overrideProvider(getModelToken(Post))
      .useValue(mockPostsModel)
      .overrideProvider(getModelToken(Files))
      .useValue(mockFilesModel)
      .overrideProvider(PostsService)
      .useValue(mockPostsService)
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

  it('/posts (GET)', () => {
    return request(app.getHttpServer())
      .get('/posts')
      .set('Authorization', authToken)
      .expect('Content-Type', /json/)
      .expect(200);
  });
});
