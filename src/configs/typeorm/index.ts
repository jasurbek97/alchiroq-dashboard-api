import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ChargeEntity } from '../../modules/charge/entities/charge.entity';
import { DeviceEntity } from '../../modules/device/entities/device.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.CHARGEHOST,
      port: +process.env.CHARGEPORT,
      username: process.env.CHARGEUSER,
      password: process.env.CHARGEPASS,
      database: process.env.CHARGEDB,
      entities: [ChargeEntity],
      synchronize: false,
      useUTC: true,
    };
  }
}

export const DeviceOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DEVICEHOST,
  port: +process.env.DEVICEPORT,
  username: process.env.DEVICEUSER,
  password: process.env.DEVICEPASS,
  database: process.env.DEVICEDB,
  entities: [DeviceEntity],
  synchronize: false,
  useUTC: true,
};
