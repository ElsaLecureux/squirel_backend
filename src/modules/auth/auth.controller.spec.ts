import { Test, TestingModule } from '@nestjs/testing';
import { Response, Request } from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from './dto/createUser.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signIn: jest.fn(),
    signUp: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return access token and message for mobile platform', async () => {
      const signInDto: SignInDto = { username: 'test@example.com', password: 'password123' };
      const serviceResult = { access_token: 'mockToken' };

      // Mock the service method
      mockAuthService.signIn.mockResolvedValue(serviceResult);

      // Mock Response object
      const mockRes = {
        cookie: jest.fn(),
      } as unknown as Response;

      // Mock Request object with mobile header
      const mockReq = {
        headers: {
          'x-client-platform': 'mobile',
        },
      } as unknown as Request;

      const result = await controller.signIn(signInDto, mockRes, mockReq);

      expect(result).toEqual({
        access_token: 'mockToken',
        message: 'Login successful',
      });
      expect(authService.signIn).toHaveBeenCalledWith(signInDto);
      expect(mockRes.cookie).toHaveBeenCalledWith('token', 'mockToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
      });
    });

    it('should return only message for web platform', async () => {
      const signInDto: SignInDto = { username: 'test@example.com', password: 'password123' };
      const serviceResult = { access_token: 'mockToken' };

      mockAuthService.signIn.mockResolvedValue(serviceResult);

      const mockRes = {
        cookie: jest.fn(),
      } as unknown as Response;

      // Mock Request object without mobile header (web platform)
      const mockReq = {
        headers: {},
      } as unknown as Request;

      const result = await controller.signIn(signInDto, mockRes, mockReq);

      expect(result).toEqual({ message: 'Login sucessful' });
      expect(authService.signIn).toHaveBeenCalledWith(signInDto);
      expect(mockRes.cookie).toHaveBeenCalledWith('token', 'mockToken', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 2 * 60 * 60 * 1000,
      });
    });
  });

  describe('signUp', () => {
    it('should return access token on successful sign up', async () => {
      const createUserDto: CreateUserDto = {
        email: 'newuser@example.com',
        password: 'securePassword',
        username: 'newuser',
      };
      const result = { access_token: 'mockToken' };

      jest.spyOn(authService, 'signUp').mockResolvedValue(result);

      expect(await controller.signUp(createUserDto)).toEqual(result);
      expect(authService.signUp).toHaveBeenCalledWith(createUserDto);
    });
  });
});
