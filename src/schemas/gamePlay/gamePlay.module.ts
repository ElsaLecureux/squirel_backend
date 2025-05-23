import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamePlay, gamePlaySchema } from './gamePlay.schema';
import { GamePlayController } from './gamePlay.controller';
import { GamePlayService } from './gamePlay.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: GamePlay.name, schema: gamePlaySchema }])],
  controllers: [GamePlayController],
  providers: [GamePlayService],
})
export class GamePlayModule {}
