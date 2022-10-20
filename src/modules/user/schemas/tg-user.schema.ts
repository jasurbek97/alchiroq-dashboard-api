import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

export type TgUserDocument = TgUser & Document;

@Schema()
export class TgUser implements UserInterface {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  count: number;
}

export const TgUserSchema = SchemaFactory.createForClass(TgUser);
