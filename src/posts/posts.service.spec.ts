import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';
import { Files } from './models/files.model';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';

jest.mock('./models/post.model');
jest.mock('./models/files.model');

describe('PostsService', () => {
  let service: PostsService;
  const mockPostModel = {
    create: jest.fn((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    findOne: jest.fn().mockImplementation((dto) => dto),
    findAll: jest.fn().mockImplementation((dto) => []),
  };
  const FilesModel = {};
  let configService = {
    getOrThrow: () => {},
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: ConfigService, useValue: configService },
        { provide: getModelToken(Post), useValue: mockPostModel },
        { provide: getModelToken(Files), useValue: FilesModel },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return posts', async () => {
    const authorId = 1;
    expect(await service.findAll(authorId)).toEqual([]);
    expect(mockPostModel.findAll).toHaveBeenCalled();
  });
});
