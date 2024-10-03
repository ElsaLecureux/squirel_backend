import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ParseIntPipe,
  Delete,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserDto } from './user.dto';
import { Errors } from '../Enums/enums';
import validator from 'validator';

// eslint-disable-next-line prettier/prettier
const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Post()
  async createUser(
    @Body(ValidationPipe) userDto: UserDto,
  ): Promise<User | string> {
    if (!validator.isEmail(userDto.email)) {
      return Errors.INVALID_EMAIL;
    }

    if (!validator.matches(userDto.password, regexPassword)) {
      return Errors.INVALID_PASSWORD;
    }
    return this.usersService.createUser(userDto);
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userDto: UserDto,
  ): Promise<UserDto | string> {
    if (!validator.isEmail(userDto.email)) {
      return Errors.INVALID_EMAIL;
    }

    if (!validator.isStrongPassword(userDto.password)) {
      return Errors.INVALID_PASSWORD;
    }
    return this.usersService.updateUser(id, userDto);
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.usersService.deleteUser(id);
  }
}
