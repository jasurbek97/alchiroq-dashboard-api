import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppUserOptions, TgUserOptions } from '../../configs/typeorm/index';
import { TgUser, TgUserSchema } from './schemas/tg-user.schema';
import { User, UserSchema } from './schemas/user.schema';
import { TasksService } from './tasks.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppUserOptions,
      name: 'USER_CONNECTION',
    }),
    TypeOrmModule.forRoot({
      ...TgUserOptions,
      name: 'TG_USER_CONNECTION',
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: TgUser.name, schema: TgUserSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, TasksService],
})
export class UserModule {}
