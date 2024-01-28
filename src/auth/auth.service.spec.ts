import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';

describe('AuthService', () => {
  const user = {
    dataValues: {
      id: 1,
      username: 'test',
      password: 'password',
      name: 'test',
    },
    validatePassword: jest.fn().mockImplementation((password) => true),
  };
  let service: AuthService;
  const mockUserModel = {
    findOne: jest.fn().mockImplementation((dto) => dto),
  };
  const mockUsersService = {
    findByUsername: jest.fn().mockImplementation((_) => user),
  };
  const mockJwtService = {
    sign: jest.fn().mockImplementation(() => 'access_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: getModelToken(User), useValue: mockUserModel },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should  login user', async () => {
    expect(
      await service.login({ username: 'test', password: 'password' }),
    ).toBeTruthy();
  });

  it('should return access token on login', async () => {
    expect(
      await service.login({ username: 'test', password: 'password' }),
    ).toEqual({ access_token: 'access_token' });
  });
});
