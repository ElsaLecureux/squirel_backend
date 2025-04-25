import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { UserPlayGameService } from './userPlayGame.service';
import { UserPlayGameDto, UserPlayGameFullDto } from './userPlayGame.dto';

@Controller('userPlayGame')
export class UserPlayGameController {
  constructor(private readonly userPlayGameService: UserPlayGameService) {}
  //get User game score
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUserGamesWon(@Param('id', ParseIntPipe) userId: number): Promise<UserPlayGameFullDto> {
    return await this.userPlayGameService.getUserGamesWon(userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async playerWonGame(
    @Body(ValidationPipe) userPlayGameDto: UserPlayGameDto,
  ): Promise<UserPlayGameFullDto> {
    return await this.userPlayGameService.playerWonGame(userPlayGameDto);
  }
}
