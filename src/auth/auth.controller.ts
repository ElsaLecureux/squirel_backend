import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './signIn.dto';
import { UserDto } from 'src/users/user.dto';
import { UsersService } from 'src/users/users.service';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<{ access_token }> {
    return await this.authService.signIn(signInDto);
  }

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body(ValidationPipe) userDto: UserDto): Promise<{ access_token }> {
    return await this.authService.signUp(userDto);
  }
}
