import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GamePlayMemory, gamePlayMemorySchema } from './gamePlayMemory';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GamePlayMemory.name, schema: gamePlayMemorySchema }]),
  ],
  controllers: [],
  providers: [],
})
export class GamePlayModule {}
