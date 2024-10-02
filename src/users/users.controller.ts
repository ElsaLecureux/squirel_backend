import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserDto } from './user.dto';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//   @Get()
//   findAll(@Req() request: Request): string {
//     return 'This action returns all cats';
//   }

  @Post()
  async createUser(@Body() userDto: UserDto): Promise<User> {
    return this.usersService.createUser(userDto);
  }
}
