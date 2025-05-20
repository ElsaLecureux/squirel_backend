import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Timestamp } from 'typeorm/driver/mongodb/typings';

type card = {
  won: boolean;
  id: number;
  animal: string;
};
export type gamePlayMemoryDocument = HydratedDocument<GamePlayMemory>;

@Schema()
export class GamePlayMemory {
  @Prop()
  id: number;

  @Prop()
  userId: number;

  @Prop()
  date: Timestamp;

  @Prop([{}])
  cards: card[];
}

export const gamePlayMemorySchema = SchemaFactory.createForClass(GamePlayMemory);

//{ObjectId('id'); NumberInt('userId'), Timestamp(low, high), String('animal'), Array({NumberInt('id'), String(''), boolean('won')})}
