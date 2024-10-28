import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Delete,
  Put,
  ValidationPipe,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './user.dto';
import { Errors } from '../Enums/enums';
import validator from 'validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response> {
    try {
      const user = await this.usersService.getUser(id);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ message: Errors.USER_NOT_FOUND });
      } else {
        return res.status(500).json({ message: Errors.INTERNAL_SERVER_ERROR });
      }
    }
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userDto: UserDto,
    @Res() res: Response,
  ): Promise<Response> {
    if (!validator.isEmail(userDto.email)) {
      return res.status(400).json({ message: Errors.INVALID_EMAIL });
    }

    if (!validator.isStrongPassword(userDto.password)) {
      return res.status(400).json({ message: Errors.INVALID_PASSWORD });
    }
    try {
      const user = await this.usersService.updateUser(id, userDto);
      return res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ message: Errors.USER_NOT_FOUND });
      } else {
        return res.status(500).json({ message: Errors.INTERNAL_SERVER_ERROR });
      }
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<Response> {
    try {
      await this.usersService.deleteUser(id);
      return res.status(200).send('success');
    } catch (error) {
      if (error instanceof NotFoundException) {
        return res.status(404).json({ message: Errors.USER_NOT_FOUND });
      } else {
        return res.status(500).json({ message: Errors.INTERNAL_SERVER_ERROR });
      }
    }
  }
}
