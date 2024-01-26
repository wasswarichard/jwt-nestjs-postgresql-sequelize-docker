import { IsEnum, IsOptional, MaxLength } from 'class-validator';

export const postStatus = {
  PRIVATE: 'private',
  PUBLIC: 'public',
};

export class CreatePostDto {
  @MaxLength(30)
  title: string;

  body: string;

  metadata: string;

  tags: string[];

  @IsOptional()
  @IsEnum([postStatus.PUBLIC, postStatus.PRIVATE])
  status: 'public' | 'private';
}
