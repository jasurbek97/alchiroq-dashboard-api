import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceOptions } from '../../configs/typeorm/index';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { Device, DeviceSchema } from './schemas/device.schema';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DeviceOptions,
      name: 'deviceConnection',
    }),
    MongooseModule.forFeature([{ name: Device.name, schema: DeviceSchema }]),
  ],
  controllers: [DeviceController],
  providers: [DeviceService, TasksService],
})
export class DeviceModule {}
