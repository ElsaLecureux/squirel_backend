import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CardDto } from './card.dto';

export type gamePlayMemoryDocument = HydratedDocument<GamePlayMemory>;

@Schema()
export class GamePlayMemory {
  @Prop()
  id: number;

  @Prop()
  userId: number;

  @Prop()
  date: Date;

  @Prop([{}])
  cards: CardDto[];
}

export const gamePlayMemorySchema = SchemaFactory.createForClass(GamePlayMemory);
