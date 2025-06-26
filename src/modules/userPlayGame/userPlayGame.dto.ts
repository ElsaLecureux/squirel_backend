import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Errors } from 'src/shared/enums/errorsEnum';
import { ApiProperty } from '@nestjs/swagger';

export class UserPlayGameDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  gameId: number;

  @ApiProperty()
  @IsNumber()
  numberOfTimeWon: number;

  @ApiProperty()
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
  avatargold: string;
}
