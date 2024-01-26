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
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post as UserPost } from './models/post.model';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 40000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Request() req,
    @Body(new ValidationPipe()) createPostDto: CreatePostDto,
  ): Promise<UserPost> {
    // const filePath = this.postsService.fileUpload(
    //   file.originalname,
    //   file.buffer,
    // );
    return this.postsService.create({
      ...createPostDto,
      authorId: req.user.id,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Promise<UserPost[]> {
    return this.postsService.findAll(req.user.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserPost> {
    return this.postsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(+id);
  }
}
