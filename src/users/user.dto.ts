import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Errors } from '../Enums/enums';

// eslint-disable-next-line prettier/prettier
const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export class UserDto {
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  username: string;

  @IsString({ message: 'Email must be a string.' })
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  @IsEmail({}, { message: Errors.INVALID_EMAIL })
  email: string;

  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  @Matches(regexPassword, {
    message: Errors.INVALID_PASSWORD,
  })
  password: string;

  //@IsNumber()
  id: number;
}
