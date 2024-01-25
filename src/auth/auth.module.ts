import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    // JwtModule.registerAsync({
    //   useFactory: () => ({
    //     secret: process.env.JWT_SECRET_KEY,
    //     signOptions: { expiresIn: '3600s' },
    //   }),
    // }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: '60s',
      },
    }),
    SequelizeModule.forFeature([User]),
  ],
  providers: [AuthService, JwtGuard, JwtStrategy, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
