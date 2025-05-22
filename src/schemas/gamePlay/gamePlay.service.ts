import { Injectable } from '@nestjs/common';
import { GamePlayDto } from './gamePlay.dto';

@Injectable()
export class GamePlayService {
  getGamePlay(userId: number) {
    console.log(userId);
    return {
      userId: 1,
      date: '2025-05-22T00:00:00.000Z',
      cards: [
        {
          id: 1,
          won: false,
          animal: 'lion',
        },
      ],
    };
  }
  updateGamePlay(gamePlayDto: GamePlayDto) {
    return gamePlayDto;
  }
}
