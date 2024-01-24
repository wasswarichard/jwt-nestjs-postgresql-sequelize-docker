import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
  ) {}

  create(createPostDto: CreatePostDto): Promise<Post> {
    return this.postModel.create({ ...createPostDto });
  }

  findAll(): Promise<Post[]> {
    return this.postModel.findAll();
  }

  findOne(id: number): Promise<Post> {
    return this.postModel.findOne({ where: { id } });
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<[number, Post[]]> {
    const [affectedCount, affectedRows] = await this.postModel.update(
      updatePostDto,
      { where: { id }, returning: true },
    );
    return [affectedCount, affectedRows] ;
  }

  async remove(id: number): Promise<void> {
    const post = await this.findOne(id);
    await post.destroy();
  }
}
