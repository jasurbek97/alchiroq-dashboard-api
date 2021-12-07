import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ActivityEntity } from '../../modules/activity/entities/activity.entity';
import { ChargeEntity } from '../../modules/charge/entities/charge.entity';
import { DeviceEntity } from '../../modules/device/entities/device.entity';
import { UserEntity } from '../../modules/user/entities/user.entity';

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

export const AppUserOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.APPUSERHOST,
  port: +process.env.APPUSERPORT,
  username: process.env.APPUSERDBUSER,
  password: process.env.APPUSERDBPASS,
  database: process.env.APPUSERDB,
  entities: [UserEntity],
  synchronize: false,
  useUTC: true,
};

export const appLogOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.LOGINHOST,
  port: +process.env.LOGPORT,
  username: process.env.LOGDBUSER,
  password: process.env.LOGDBPASS,
  database: process.env.LOGDB,
  entities: [ActivityEntity],
  synchronize: false,
  useUTC: true,
};
