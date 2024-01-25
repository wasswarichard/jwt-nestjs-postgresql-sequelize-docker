import { IsEnum, MaxLength } from 'class-validator';

export class CreatePostDto {
  @MaxLength(20)
  title: string;
  body: string;
  metadata: string;
  @IsEnum(['public', 'private'], { message: 'use correct post tag ' })
  tag?: 'public' | 'private';
}
