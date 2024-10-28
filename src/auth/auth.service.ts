import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { SignUpResponseDto } from './signUpResponse.dto';
import { SignInDto } from './signIn.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    return await this.usersService.findByUsername(signInDto.username);
  }

  async signUp(user: User): Promise<SignUpResponseDto> {
    const userCreated = await this.usersService.createUser(user);

    //toDo generate token or controller generate it?
    const token = 'token';

    return {
      user: userCreated,
      token: token,
      message: 'user created',
    };
  }
}
