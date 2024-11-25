import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  ValidationPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this.usersService.getUser(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userDto: UserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(id, userDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.usersService.deleteUser(id);
    } catch (error) {
      throw error; // Re-throw the error to ensure NestJS handles it and sends the correct status code
    }
  }
}
