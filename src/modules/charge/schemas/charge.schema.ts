import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ChargeInterface } from '../interfaces/charge.interface';

export type ChargeDocument = Charge & Document;

@Schema()
export class Charge implements ChargeInterface {
  @Prop({ required: true })
  tariff: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  status: string;
}

export const ChargeSchema = SchemaFactory.createForClass(Charge);
