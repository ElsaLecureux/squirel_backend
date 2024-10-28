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

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
