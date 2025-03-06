import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserDto } from './user.dto';
import { Errors } from '../Enums/enums';
import { setPassword } from 'src/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUser(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException(Errors.USER_NOT_FOUND);
    }
    delete user.password;
    return user;
  }

  async createUser(user: User): Promise<User> {
    try {
      const userCreated = await this.usersRepository.save(user);
      delete userCreated.password;
      return userCreated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(Errors.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser(id: number, userDto: UserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user === null) {
      throw new NotFoundException(Errors.USER_NOT_FOUND);
    }
    user.username = userDto.username;
    user.email = userDto.email;
    user.password = await setPassword(userDto.password);
    try {
      const userUpdated = await this.usersRepository.save(user);
      delete userUpdated.password;
      return userUpdated;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(Errors.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteUser(id: number): Promise<any> {
    const deleteResult = await this.usersRepository.delete({ id });
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }
}
