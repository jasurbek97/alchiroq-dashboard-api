import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

export type UserDocument = User & Document;

@Schema()
export class User implements UserInterface {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  count: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
