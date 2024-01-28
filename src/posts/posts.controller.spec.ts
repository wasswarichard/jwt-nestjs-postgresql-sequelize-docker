import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

describe('PostsController', () => {
  let controller: PostsController;
  const mockPostsService = {
    findAll: jest.fn().mockImplementation((dto) => []),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService],
    })
      .overrideProvider(PostsService)
      .useValue(mockPostsService)
      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should return all posts', () => {
    const request = { user: { id: 1 } };
    expect(controller.findAll(request)).toEqual([]);
  });
});
