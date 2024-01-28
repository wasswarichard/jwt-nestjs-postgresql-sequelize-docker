import { IsEnum, IsOptional, MaxLength } from 'class-validator';

export const postStatus = {
  PRIVATE: 'private',
  PUBLIC: 'public',
};

export class CreatePostDto {
  @MaxLength(30)
  title: string;

  body: string;

  @IsEnum(['TECHNOLOGY', 'INNOVATION', 'HEALTHCARE', 'AI'], {
    message: 'use correct tag - TECHNOLOGY, INNOVATION, HEALTHCARE, AI',
  })
  tags: string;

  @IsOptional()
  @IsEnum([postStatus.PUBLIC, postStatus.PRIVATE])
  status: 'public' | 'private';
}
