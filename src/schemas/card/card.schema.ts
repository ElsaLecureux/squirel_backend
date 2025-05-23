import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ required: true, unique: true })
  id: number;

  @Prop()
  won: boolean;

  @Prop()
  animal: string;
}

export const cardSchema = SchemaFactory.createForClass(Card);
