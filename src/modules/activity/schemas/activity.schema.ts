import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ActivityInterface } from '../interfaces/activity.interface';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity implements ActivityInterface {
  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  count: number;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
