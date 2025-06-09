import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { validatePassword, setPassword } from 'src/shared/utils/hash-password.utils';
import { User } from '../users/user.entity';

// Mock hash-password utils
jest.mock('src/shared/utils/hash-password.utils', () => ({
  validatePassword: jest.fn(),
  setPassword: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersService = {
    findByUsername: jest.fn(),
    findByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return access token for valid credentials', async () => {
      const dto: SignInDto = { username: 'testuser', password: 'password' };
      const mockUser = { id: 1, password: 'hashed' };

      mockUsersService.findByUsername.mockResolvedValue(mockUser);
      (validatePassword as jest.Mock).mockResolvedValue(true);
      mockJwtService.signAsync.mockResolvedValue('token');

      const result = await service.signIn(dto);
      expect(result).toEqual({ access_token: 'token' });
      expect(mockUsersService.findByUsername).toHaveBeenCalledWith(dto.username);
      expect(validatePassword).toHaveBeenCalledWith(dto.password, mockUser.password);
    });

    it('should throw if user not found', async () => {
      mockUsersService.findByUsername.mockResolvedValue(null);
      const dto: SignInDto = { username: 'notfound', password: 'pass' };

      await expect(service.signIn(dto)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw if password is invalid', async () => {
      const dto: SignInDto = { username: 'testuser', password: 'wrongpass' };
      const mockUser = { id: 1, password: 'hashed' };

      mockUsersService.findByUsername.mockResolvedValue(mockUser);
      (validatePassword as jest.Mock).mockResolvedValue(false);

      await expect(service.signIn(dto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('signUp', () => {
    it('should create a new user and return access token', async () => {
      const dto: CreateUserDto = {
        email: 'new@example.com',
        username: 'newuser',
        password: 'pass123',
      };

      const newUser = new User();
      newUser.email = dto.email;
      newUser.username = dto.username;
      newUser.password = 'hashedPass';
      newUser.id = 1;

      mockUsersService.findByUsername.mockResolvedValue(null);
      mockUsersService.findByEmail.mockResolvedValue(null);
      (setPassword as jest.Mock).mockResolvedValue('hashedPass');
      mockUsersService.createUser.mockResolvedValue({ ...newUser });
      mockJwtService.signAsync.mockResolvedValue('token');

      const result = await service.signUp(dto);
      expect(result).toEqual({ access_token: 'token' });
    });

    it('should throw if username already exists', async () => {
      mockUsersService.findByUsername.mockResolvedValue({ id: 1 });
      const dto: CreateUserDto = { email: 'test@example.com', username: 'taken', password: 'pass' };

      await expect(service.signUp(dto)).rejects.toThrow(ConflictException);
    });

    it('should throw if email already exists', async () => {
      mockUsersService.findByUsername.mockResolvedValue(null);
      mockUsersService.findByEmail.mockResolvedValue({ id: 1 });
      const dto: CreateUserDto = {
        email: 'exists@example.com',
        username: 'user',
        password: 'pass',
      };

      await expect(service.signUp(dto)).rejects.toThrow(ConflictException);
    });

    it('should throw if user creation fails', async () => {
      mockUsersService.findByUsername.mockResolvedValue(null);
      mockUsersService.findByEmail.mockResolvedValue(null);
      (setPassword as jest.Mock).mockResolvedValue('hashedPass');
      mockUsersService.createUser.mockResolvedValue(null);
      const dto: CreateUserDto = { email: 'fail@example.com', username: 'fail', password: 'pass' };

      await expect(service.signUp(dto)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
