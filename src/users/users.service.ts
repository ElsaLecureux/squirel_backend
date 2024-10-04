import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async createUser(userDto: UserDto): Promise<User> {
    const user = this.usersRepository.create({
      username: userDto.username,
      email: userDto.email,
      password: userDto.password,
    });
    return await this.usersRepository.save(user);
  }

  async updateUser(id: number, userDto: UserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }
    user.username = userDto.username;
    user.email = userDto.email;
    user.password = userDto.password;
    return await this.usersRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const response = await this.usersRepository.delete({ id });
    if (response.affected === 0) {
      throw new NotFoundException();
    }
  }
}
