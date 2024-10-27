import { Body, ConflictException, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto } from './signIn.dto';
import { Errors } from '../Enums/enums';
import { UserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signIn')
  async signIn(@Body(ValidationPipe) signInDto: SignInDto, @Res() res: Response): Promise<any> {
    try {
      //todo JWT
      await this.authService.signIn(signInDto);
      return res.status(200).json({ message: 'user connected' });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: Errors.INVALID_CREDENTIALS });
    }
  }

  @Post('signUp')
  async signUp(@Body(ValidationPipe) userDto: UserDto, @Res() res: Response): Promise<any> {
    const { username, email } = userDto;
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
    try {
      //todo JWT
      const userCreatedObject = await this.authService.signUp(userDto);
      return res.status(200).json({ userCreatedObject });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: 'User creation failed' });
    //   if(error instanceof ConflictException && error ) {
    //     return 
    //   } else if(error instanceof ConflictException && ) {
    //     return
    //   } else {
    //       return res.status(404).json({ message: 'something happened user not created' });
    //   }
    }
  }
}
