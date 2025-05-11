import { IsOptional, IsString, Matches } from 'class-validator';
import { Errors } from '../../../shared/enums/errorsEnum';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { UserDto } from 'src/modules/users/user.dto';

const regexPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export class UpdateUserDto extends OmitType(UserDto, ['id'] as const) {
  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'Password must be a string.' })
  @Matches(regexPassword, {
    message: Errors.INVALID_PASSWORD,
  })
  newPassword?: string;
}
