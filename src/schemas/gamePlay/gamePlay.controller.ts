import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { GamePlayDto } from './gamePlay.dto';
import { GamePlayService } from './gamePlay.service';

@Controller('/gamePlay')
export class GamePlayController {
  constructor(private readonly gamePlayService: GamePlayService) {}
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'The game play has been successfully loaded' })
  async getGamePlay(@Param('id', ParseIntPipe) userId: number): Promise<GamePlayDto> | null {
    return this.gamePlayService.getGamePlay(userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: 'The game play has been successfully updated',
  })
  @ApiBody({
    type: GamePlayDto,
    description: 'Json structure for game play object',
  })
  async updateGamePlay(@Body(ValidationPipe) gamePlayDto: GamePlayDto): Promise<GamePlayDto> {
    return this.gamePlayService.updateGamePlay(gamePlayDto);
  }
}
