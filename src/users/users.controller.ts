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
  async findUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<void> {
    try {
      const user = await this.usersService.getUser(id);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: Errors.USER_NOT_FOUND });
      } else {
        res.status(500).json({ message: Errors.INTERNAL_SERVER_ERROR });
      }
    }
  }

  @Post()
  async createUser(@Body(ValidationPipe) userDto: UserDto, @Res() res: Response): Promise<void> {
    if (!validator.isEmail(userDto.email)) {
      res.status(400).json({ message: Errors.INVALID_EMAIL });
    }
    // eslint-disable-next-line prettier/prettier
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!validator.matches(userDto.password, regexPassword)) {
      res.status(400).json({ message: Errors.INVALID_PASSWORD });
    }
    try {
      const user = await this.usersService.createUser(userDto);
      res.status(201).json(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      res.status(500).json({ message: Errors.INTERNAL_SERVER_ERROR });
    }
  }

  @Put('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userDto: UserDto,
    @Res() res: Response,
  ): Promise<void> {
    if (!validator.isEmail(userDto.email)) {
      res.status(400).json({ message: Errors.INVALID_EMAIL });
    }

    if (!validator.isStrongPassword(userDto.password)) {
      res.status(400).json({ message: Errors.INVALID_PASSWORD });
    }
    try {
      const user = await this.usersService.updateUser(id, userDto);
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: Errors.USER_NOT_FOUND });
      } else {
        res.status(500).json({ message: Errors.INTERNAL_SERVER_ERROR });
      }
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response): Promise<void> {
    try {
      await this.usersService.deleteUser(id);
      res.status(204).send('success');
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: Errors.USER_NOT_FOUND });
      } else {
        res.status(500).json({ message: Errors.INTERNAL_SERVER_ERROR });
      }
    }
  }
}
