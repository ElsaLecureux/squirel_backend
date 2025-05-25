import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  won: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  animal: string;
}
