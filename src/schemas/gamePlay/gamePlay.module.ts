import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamePlayMemory, gamePlayMemorySchema } from './gamePlay.schema';
import { GamePlayController } from './gamePlay.controller';
import { GamePlayService } from './gamePlay.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GamePlayMemory.name, schema: gamePlayMemorySchema }]),
  ],
  controllers: [GamePlayController],
  providers: [GamePlayService],
})
export class GamePlayModule {}
