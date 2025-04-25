import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Errors } from 'src/shared/enums/errorsEnum';

export class UserPlayGameDto {
  @IsNumber()
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  userId: number;

  @IsNumber()
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  gameId: number;

  @IsNumber()
  numberOfTimeWon: number;

  @IsString()
  name: string;
}

export class UserPlayGameFullDto {
  @IsNumber()
  userId: number;

  @IsNumber()
  gameId: number;

  @IsNumber()
  numberOfTimeWon: number;

  @IsString()
  name: string;

  @IsString()
  avatar: string;

  @IsString()
  avatarGold: string;
}
