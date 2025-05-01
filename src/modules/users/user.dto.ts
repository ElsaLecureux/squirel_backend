import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { Errors } from '../../shared/enums/errorsEnum';
import { ApiProperty } from '@nestjs/swagger';

// eslint-disable-next-line prettier/prettier
const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export class UserDto {
  @ApiProperty()
  @IsString({ message: 'Username must be a string.' })
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  username: string;

  @ApiProperty()
  @IsString({ message: 'Email must be a string.' })
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  @IsEmail({}, { message: Errors.INVALID_EMAIL })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  @Matches(regexPassword, {
    message: Errors.INVALID_PASSWORD,
  })
  password: string;

  //@IsNumber()
  @ApiProperty()
  id: number;
}
