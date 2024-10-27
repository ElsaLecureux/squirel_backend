import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './user.dto';
import { SignInDto } from '../auth/signIn.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async createUser(user: User): Promise<User> {
    const userCreated = await this.usersRepository.save(user);
    delete userCreated.password;
    delete userCreated.salt;
    return userCreated;
  }

  async updateUser(id: number, userDto: UserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    user.username = userDto.username;
    user.email = userDto.email;
    user.password = userDto.password;
    const userUpdated = await this.usersRepository.save(user);
    delete userUpdated.password;
    delete userUpdated.salt;
    return userUpdated;
  }

  async deleteUser(id: number): Promise<void> {
    const response = await this.usersRepository.delete({ id });
    if (response.affected === 0) {
      throw new NotFoundException();
    }
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const username = signInDto.username;
    const password = signInDto.password;
    const user = await this.usersRepository.findOne({ where: { username } });
    const passwordIsValid = await user.validatePassword(password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid credentials');
    } else if (!user) {
      throw new NotFoundException();
    } else {
      return user;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
