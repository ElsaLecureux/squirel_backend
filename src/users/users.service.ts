import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDto): Promise<User> {
    try {
      const user = await this.usersRepository.create({
        username: userDto.username,
        email: userDto.email,
        password: userDto.password,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUser(id: number, userDto: UserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    user.username = userDto.username;
    user.email = userDto.email;
    user.password = userDto.password;
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('User update failed:');
    }
  }

  async deleteUser(id: number): Promise<string> {
    const result = await this.usersRepository.delete({ id });
    if (result.affected == 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return `User with ID ${id} was deleted successfully.`;
  }
}
