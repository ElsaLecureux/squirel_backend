import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserResponseDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  id: number;
}

export class SignUpResponseDto {
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  user: UserResponseDto;
}
