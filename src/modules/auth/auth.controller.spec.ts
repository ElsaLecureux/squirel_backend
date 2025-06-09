import { Test, TestingModule } from '@nestjs/testing';
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
    it('should return access token on successful sign in', async () => {
      const signInDto: SignInDto = { username: 'test@example.com', password: 'password123' };
      const result = { access_token: 'mockToken' };

      jest.spyOn(authService, 'signIn').mockResolvedValue(result);

      expect(await controller.signIn(signInDto)).toEqual(result);
      expect(authService.signIn).toHaveBeenCalledWith(signInDto);
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
