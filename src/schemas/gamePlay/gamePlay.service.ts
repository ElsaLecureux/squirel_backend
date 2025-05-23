import { Injectable } from '@nestjs/common';
import { GamePlayDto } from './gamePlay.dto';
import { GamePlay, GamePlayDocument } from './gamePlay.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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
    const todayDate = new Date().toDateString();
    const existingGamePlay = await this.gamePlayModel
      .findOne({ userId: gamePlayDto.userId })
      .exec();
    if (!existingGamePlay) {
      gamePlayDto.date = todayDate;
      const newGamePlay = new this.gamePlayModel(gamePlayDto);
      return await newGamePlay.save();
    } else {
      existingGamePlay.date = todayDate;
      existingGamePlay.cards = gamePlayDto.cards;
      return await existingGamePlay.save();
    }
  }
}
