import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { validatePassword, setPassword } from 'src/shared/utils/hash-password.utils';
import { Errors } from '../../shared/enums/errorsEnum';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findByUsername(signInDto.username);
    if (user === null) {
      throw new UnauthorizedException(Errors.INVALID_CREDENTIALS);
    }
    const passwordIsValid = await validatePassword(signInDto.password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException(Errors.INVALID_CREDENTIALS);
    }
    const payload = { sub: user.id };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  async signUp(createUserDto: CreateUserDto): Promise<{ access_token }> {
    const { username, email } = createUserDto;
    const doesUsernameExist = await this.usersService.findByUsername(username);
    if (doesUsernameExist) {
      throw new ConflictException(Errors.USERNAME_ALREADY_EXIST);
    }

    const doesEmailExist = await this.usersService.findByEmail(email);
    if (doesEmailExist) {
      throw new ConflictException(Errors.EMAIL_ALREADY_EXIST);
    }
    const user = new User();
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = await setPassword(createUserDto.password);
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
