import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  const user = {
    dataValues: {
      id: 1,
      username: 'test',
      password: 'password',
      name: 'test',
    },
    validatePassword: jest.fn().mockImplementation((password) => true),
  };

  let controller: AuthController;
  const mockUsersService = {
    create: jest.fn((dto) => Promise.resolve({ id: Date.now(), ...dto })),
    findByUsername: jest.fn().mockImplementation((_) => user),
  };

  const mockJwtService = {
    sign: jest.fn().mockImplementation(() => 'access_token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register a user', async () => {
    expect(
      await controller.create({
        name: 'John Doe',
        username: 'doe',
        password: 'password',
      }),
    ).toEqual({
      id: expect.any(Number),
      name: 'John Doe',
      username: 'doe',
      password: 'password',
    });

    expect(mockUsersService.create).toHaveBeenCalled();
  });

  it('should login user', async () => {
    expect(
      await controller.login({ username: 'doe', password: 'password' }),
    ).toEqual({ access_token: 'access_token' });

    expect(mockJwtService.sign).toHaveBeenCalled();
  });
});
