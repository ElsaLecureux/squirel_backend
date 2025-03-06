import { Body, Controller, Get, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { UserPlayGameService } from './userPlayGame.service';
import { UserPlayGameDto } from './userPlayGame.dto';

@Controller('userPlayGame')
export class UserPlayGameController {
  constructor(private readonly userPlayGameService: UserPlayGameService) {}
  //get User game score
  @Get('userPlayGame')
  @HttpCode(HttpStatus.OK)
  async getUserGameWon(@Body(ValidationPipe) userPlayGameDto: UserPlayGameDto): Promise<any> {
    return await this.userPlayGameService.getUserGameWon(userPlayGameDto);
  }

  @Post('userPlayGame')
  @HttpCode(HttpStatus.OK)
  async updateUserGameWon(userId: number, gameId: number): Promise<any> {
    return await this.userPlayGameService.updateUserGameWon(userId, gameId);
  }
}
