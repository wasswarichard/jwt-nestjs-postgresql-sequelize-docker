import { IsEmail } from 'class-validator';

export class CreateUserDto {
  name: string;
  username: string;
  password: string;
  @IsEmail()
  email: string;
}
