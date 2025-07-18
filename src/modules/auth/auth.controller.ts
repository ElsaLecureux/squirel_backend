import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { ConfigService } from '@nestjs/config';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('me')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: Request) {
    return { userId: req.user.sub };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: SignInDto,
    description: 'Json structure for user sign in object',
  })
  @ApiResponse({ status: 200, description: 'The user has been successfully signed in' })
  async signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ): Promise<any> {
    const { access_token } = await this.authService.signIn(signInDto);

    const isProduction = this.configService.get('NODE_ENV') === 'production';

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 2 * 60 * 60 * 1000,
    });
    const isMobile = req.headers['x-client-platform'] === 'mobile';
    if (isMobile) {
      return { access_token: access_token, message: 'Login successful' };
    }
    return { message: 'Login sucessful' };
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    type: CreateUserDto,
    description: 'Json structure for user creation object',
  })
  @ApiResponse({ status: 201, description: 'The user has been successfully created' })
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ access_token }> {
    return await this.authService.signUp(createUserDto);
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  async signOut(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });

    return { message: 'Successfully signed out' };
  }
}
