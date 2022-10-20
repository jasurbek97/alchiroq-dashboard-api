import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DeviceInterface } from '../interfaces/device.interface';

export type DeviceDocument = Device & Document;

@Schema()
export class Device implements DeviceInterface {
  @Prop({ required: true })
  device: string;

  @Prop({ required: true })
  count: number;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
