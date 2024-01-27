import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as UserPost } from './models/post.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 80000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    files: Array<Express.Multer.File>,
    @Request() req,
    @Body(new ValidationPipe()) createPostDto: CreatePostDto,
  ): Promise<UserPost> {
    const uploadedFiles = await this.postsService.fileUpload(files);
    return this.postsService.create({
      ...createPostDto,
      files: uploadedFiles,
      authorId: req.user.id,
    });
  }

  @Get()
  findAll(@Request() req): Promise<UserPost[]> {
    return this.postsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserPost> {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body(new ValidationPipe()) updatePostDto: UpdatePostDto,
  ): Promise<UserPost[]> {
    return this.postsService.update(+id, {
      ...updatePostDto,
      authorId: req.user.id,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(+id);
  }
}
