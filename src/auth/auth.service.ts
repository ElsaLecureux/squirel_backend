import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './signIn.dto';
import { UserDto } from 'src/users/user.dto';
import { User } from '../users/entities/user.entity';
import { SignUpResponseDto } from './signUpResponse.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.signIn(signInDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async signUp(userDto: UserDto): Promise<SignUpResponseDto> {
    const user = new User();
    user.username = userDto.username;
    user.email = userDto.email;
    await user.setPassword(userDto.password);

    const userCreated = await this.usersService.createUser(user);

    //toDo generate token
    const token = 'token';

    return {
      user: userCreated,
      token: token,
      message: 'user created',
    };
  }
}
