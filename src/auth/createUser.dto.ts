import { OmitType } from '@nestjs/swagger';
import { UserDto } from 'src/users/user.dto';

export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}
