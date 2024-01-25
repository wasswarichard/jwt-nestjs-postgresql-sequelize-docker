import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Observable } from 'rxjs';
import { User } from '../users/models/user.model';
import { map } from 'rxjs/operators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): Observable<User> {
    return this.authService.registerAccount(createUserDto);
  }
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): Observable<{ token: string }> {
    return this.authService
      .login(user)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }
}
