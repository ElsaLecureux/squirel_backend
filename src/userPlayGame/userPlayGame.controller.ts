import { Body, Controller, Get, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { UserPlayGameService } from './userPlayGame.service';
import { UserPlayGameDto, UserPlayGameFullDto } from './userPlayGame.dto';

@Controller('userPlayGame')
export class UserPlayGameController {
  constructor(private readonly userPlayGameService: UserPlayGameService) {}
  //get User game score
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUserGamesWon(
    @Body(ValidationPipe) userPlayGameDto: UserPlayGameDto,
  ): Promise<UserPlayGameFullDto> {
    return await this.userPlayGameService.getUserGamesWon(userPlayGameDto);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async playerWonGame(
    @Body(ValidationPipe) userPlayGameDto: UserPlayGameDto,
  ): Promise<UserPlayGameFullDto> {
    return await this.userPlayGameService.playerWonGame(userPlayGameDto);
  }
}
