import { Injectable } from '@nestjs/common';
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
    const user = this.usersRepository.create({
      username: userDto.username,
      email: userDto.email,
      password: userDto.password,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    return this.usersRepository.save(user);
  }

  // findUser(id: number): Promise<User | null> {
  //   return this.usersRepository.findOneBy({ id });
  // }

  // updateUser({}): Promise<User> {
  //   return this.usersRepository.updateUser({});
  // }

  // async deleteUser(id: number): Promise<void> {
  //   await this.usersRepository.delete(id);
  // }
}
