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
import { CreateUserDto } from '../auth/dto/createUser.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { UpdateUserDto } from '../auth/dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'The user has been successfully found' })
  @HttpCode(HttpStatus.OK)
  async findUser(@Param('id', ParseIntPipe) id: number): Promise<UserDto> {
    return await this.usersService.getUser(id);
  }

  @Put('/:id')
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user object',
  })
  @ApiResponse({ status: 201, description: 'The user has been successfully updated' })
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted' })
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      await this.usersService.deleteUser(id);
    } catch (error) {
      throw error; // Re-throw the error to ensure NestJS handles it and sends the correct status code
    }
  }
}
