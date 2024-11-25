import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../entities/user.entity';
import { SignInDto } from './signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { validatePassword, setPassword } from 'src/bcrypt';
import { UserDto } from 'src/users/user.dto';
import { Errors } from '../Enums/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findByUsername(signInDto.username);
    console.log('user: ', user);
    if (user === null) {
      console.log('user not found');
      throw new UnauthorizedException(Errors.INVALID_CREDENTIALS);
    }
    const passwordIsValid = await validatePassword(signInDto.password, user.password);
    if (!passwordIsValid) {
      console.log('wrong password');
      throw new UnauthorizedException(Errors.INVALID_CREDENTIALS);
    }
    const payload = { sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(userDto: UserDto): Promise<{ access_token }> {
    const { username, email } = userDto;
    const doesUsernameExist = await this.usersService.findByUsername(username);
    if (doesUsernameExist) {
      throw new ConflictException(Errors.USERNAME_ALREADY_EXIST);
    }

    const doesEmailExist = await this.usersService.findByEmail(email);
    if (doesEmailExist) {
      throw new ConflictException(Errors.EMAIL_ALREADY_EXIST);
    }
    const user = new User();
    user.email = userDto.email;
    user.username = userDto.username;
    user.password = await setPassword(userDto.password);
    const userCreated = await this.usersService.createUser(user);
    if (!userCreated) {
      throw new InternalServerErrorException(Errors.INTERNAL_SERVER_ERROR);
    }
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
