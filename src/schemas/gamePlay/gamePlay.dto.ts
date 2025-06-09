import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CardDto } from '../card/card.dto';

export class GamePlayDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsString()
  date: string;

  @ApiProperty()
  cards: CardDto[];
}
