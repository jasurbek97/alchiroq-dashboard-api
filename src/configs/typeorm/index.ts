import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ChargeEntity } from '../../modules/charge/entities/charge.entity';

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
