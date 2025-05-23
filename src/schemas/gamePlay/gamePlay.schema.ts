import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Card, cardSchema } from '../card/card.schema';

export type GamePlayDocument = HydratedDocument<GamePlay>;

@Schema()
export class GamePlay {
  @Prop()
  id: number;

  @Prop({ required: true, unique: true })
  userId: number;

  @Prop()
  date: string;

  @Prop([cardSchema])
  cards: Card[];
}

export const gamePlaySchema = SchemaFactory.createForClass(GamePlay);
