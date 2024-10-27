import { forwardRef, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.signIn(loginDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
