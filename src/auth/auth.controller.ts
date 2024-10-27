import { Body, Controller, Post, Res, ValidationPipe } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { Errors } from '../Enums/enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signIn')
  async signIn(@Body(ValidationPipe) loginDto: LoginDto, @Res() res: Response): Promise<any> {
    try {
      return res.status(200).json({ message: 'user connected' });
      //JWT
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: Errors.INVALID_CREDENTIALS });
    }
  }
}
