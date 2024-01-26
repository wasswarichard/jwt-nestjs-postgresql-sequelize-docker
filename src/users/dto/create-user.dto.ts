import { IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(4, 24)
  username: string;

  @IsNotEmpty()
  @Length(6, 24)
  password: string;
}
