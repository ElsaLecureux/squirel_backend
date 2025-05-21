import { OmitType } from '@nestjs/swagger';
import { UserDto } from 'src/modules/users/user.dto';

export class CreateUserDto extends OmitType(UserDto, ['id'] as const) {}
