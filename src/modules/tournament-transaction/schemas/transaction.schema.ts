import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction implements TransactionInterface {
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  user_count: number;

  @Prop({ required: true })
  date: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
