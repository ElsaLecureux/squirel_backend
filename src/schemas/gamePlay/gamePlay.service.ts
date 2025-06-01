import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { GamePlayDto } from './gamePlay.dto';
import { GamePlay, GamePlayDocument } from './gamePlay.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Errors } from 'src/shared/enums/errorsEnum';

@Injectable()
export class GamePlayService {
  constructor(
    @InjectModel(GamePlay.name)
    private readonly gamePlayModel: Model<GamePlayDocument>,
  ) {}
  async getGamePlay(userId: number) {
    return await this.gamePlayModel.findOne({ userId }).exec();
  }
  async updateGamePlay(gamePlayDto: GamePlayDto) {
    const todayDate = new Date().toISOString();
    try {
      return await this.gamePlayModel.findOneAndUpdate(
        { userId: gamePlayDto.userId },
        { userId: gamePlayDto.userId, date: todayDate, cards: gamePlayDto.cards },
        {
          upsert: true, // Create if doesn't exist
          new: true, // Return the updated document
          runValidators: true, // Run schema validators
        },
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(Errors.INTERNAL_SERVER_ERROR);
    }
  }
}
