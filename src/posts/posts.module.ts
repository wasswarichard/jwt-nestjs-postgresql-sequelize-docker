import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { Files } from './models/files.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, Files])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
