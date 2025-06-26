import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserPlayGameService } from './userPlayGame.service';
import { UserPlayGameDto, UserPlayGameFullDto } from './userPlayGame.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/guards/auth.guard';

@Controller('userPlayGame')
export class UserPlayGameController {
  constructor(private readonly userPlayGameService: UserPlayGameService) {}
  //get User game score
  @Get('/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'The games the user won have been successfully loaded' })
  async getUserGamesWon(@Param('id', ParseIntPipe) userId: number): Promise<UserPlayGameFullDto> {
    return await this.userPlayGameService.getUserGamesWon(userId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'The number of time the user has won the game has been successfully updated',
  })
  @ApiBody({
    type: UserPlayGameDto,
    description: 'Json structure for userPlayGame object',
  })
  async playerWonGame(
    @Body(ValidationPipe) userPlayGameDto: UserPlayGameDto,
  ): Promise<UserPlayGameFullDto> {
    return await this.userPlayGameService.playerWonGame(userPlayGameDto);
  }
}
