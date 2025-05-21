import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { UsersService } from 'src/modules/users/users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: SignInDto,
    description: 'Json structure for user sign in object',
  })
  @ApiResponse({ status: 200, description: 'The user has been successfully signed in' })
  async signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<{ access_token }> {
    return await this.authService.signIn(signInDto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user creation object',
  })
  @ApiResponse({ status: 201, description: 'The user has been successfully created' })
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ access_token }> {
    console.log(createUserDto);
    return await this.authService.signUp(createUserDto);
  }
}
