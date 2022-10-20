import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import {
  MONGO_DATABASE,
  MONGO_HOST,
  MONGO_PORT,
} from '../../environments/index';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: 'mongodb://' + MONGO_HOST + ':' + MONGO_PORT + '/' + MONGO_DATABASE,
      autoCreate: true,
      retryAttempts: 10,
    };
  }
}
