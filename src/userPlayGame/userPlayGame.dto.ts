import { IsNotEmpty, IsNumber } from 'class-validator';
import { Errors } from 'src/Enums/enums';

export class UserPlayGameDto {
  @IsNumber()
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  userId: number;
  @IsNumber()
  @IsNotEmpty({ message: Errors.MISSING_REQUIRED_FIELD })
  gameId: number;
}
