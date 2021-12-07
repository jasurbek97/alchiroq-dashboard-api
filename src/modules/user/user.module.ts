import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserOptions } from '../../configs/typeorm/index';
import { User, UserSchema } from './schemas/user.schema';
import { TasksService } from './tasks.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppUserOptions,
      name: 'userConnection',
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, TasksService],
})
export class UserModule {}
