import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { Op } from 'sequelize';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
  ) {}

  create(createPostDto: CreatePostDto & { authorId: number }): Promise<Post> {
    return this.postModel.create({ ...createPostDto });
  }

  findAll(): Promise<Post[]> {
    return this.postModel.findAll({
      where: {
        deletedAt: {
          [Op.or]: {
            [Op.eq]: null,
            [Op.gt]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          },
        },
      },
    });
  }

  findOne(id: number): Promise<Post> {
    return this.postModel.findOne({ where: { id } });
  }

  async update(
    id: number,
    updatePostDto: UpdatePostDto & { authorId: number },
  ): Promise<[number, Post[]]> {
    const [affectedCount, affectedRows] = await this.postModel.update(
      updatePostDto,
      { where: { id }, returning: true },
    );
    return [affectedCount, affectedRows];
  }

  async remove(id: number): Promise<void> {
    const postToDelete = await this.findOne(id);
    if (postToDelete) {
      postToDelete.deletedAt = new Date();
      await postToDelete.save();
    }
  }
}
