import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  won: boolean;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;
}

export const cardSchema = SchemaFactory.createForClass(Card);
