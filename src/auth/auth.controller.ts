import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Post,
  Res,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './signIn.dto';
import { Errors } from '../Enums/enums';
import { UserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
import { User } from '../users/entities/user.entity';
import validator from 'validator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signIn')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto, @Res() res: Response): Promise<any> {
    try {
      const user = await this.authService.signIn(signInDto);
      if (!user) {
        throw new NotFoundException();
      }
      const passwordIsValid = await user.validatePassword(signInDto.password);
      if (!passwordIsValid) {
        throw new UnauthorizedException('wrong password');
      }
      //todo JWT
      return res.status(200).json({ message: 'user connected' });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: Errors.INVALID_CREDENTIALS });
    }
  }

  @Post('signUp')
  async signUp(@Body(ValidationPipe) userDto: UserDto, @Res() res: Response): Promise<any> {
    const { username, email } = userDto;
    //check if email format is right
    if (!validator.isEmail(userDto.email)) {
      return res.status(400).json({ message: Errors.INVALID_EMAIL });
    }
    // check if password format is right
    // eslint-disable-next-line prettier/prettier
    const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!validator.matches(userDto.password, regexPassword)) {
      return res.status(400).json({ message: Errors.INVALID_PASSWORD });
    }
    // Check if username already exists
    const doesUsernameExist = await this.usersService.findByUsername(username);
    if (doesUsernameExist) {
      throw new ConflictException('Username already exists');
    }
    // Check if email already exists
    const doesEmailExist = await this.usersService.findByEmail(email);
    if (doesEmailExist) {
      throw new ConflictException('Email already exists');
    }
    const user = new User();
    user.email = userDto.email;
    user.username = userDto.username;
    await user.setPassword(userDto.password);
    try {
      //todo JWT
      const userCreatedObject = await this.authService.signUp(user);
      return res.status(200).json({ userCreatedObject });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: 'User creation failed' });
    }
  }
}
