import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { find } from 'lodash';
import { Model } from 'mongoose';
import { getConnection } from 'typeorm';
import { NODE_ENV } from '../../environments/index';
import { formatDate, oneMonthAgo } from '../../utils/index';
import { TgUserEntity } from './entities/tg-user.entity';
import { UserEntity } from './entities/user.entity';
import { UserInterface } from './interfaces/user.interface';
import { TgUser, TgUserDocument } from './schemas/tg-user.schema';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(TgUser.name) private tgUserModel: Model<TgUserDocument>,
  ) {}

  async findAll() {
    const date = new Date();
    const dateFrom = formatDate(
      new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()),
    );

    const users = await this.userModel
      .find({
        date: { $gte: dateFrom },
      })
      .select('date count')
      .sort({ date: 'asc' })
      .exec();

    const tgUsers = await this.tgUserModel
      .find({
        date: { $gte: dateFrom },
      })
      .select('date count')
      .sort({ date: 'asc' })
      .exec();

    const dates = [];
    const data = [];
    const data2 = [];

    users.forEach(({ date, count }) => {
      if (!dates.includes(date)) {
        dates.push(date);
        const user = find(tgUsers, { date: date });
        user ? data2.push(user.count) : data2.push(0);
      }
      data.push(count);
    });

    return {
      dates: dates,
      data: data,
      data2: data2,
    };
  }

  async find(): Promise<UserInterface[]> {
    return await getConnection('USER_CONNECTION')
      .createQueryBuilder()
      .from(UserEntity, 'u')
      .where('deleted_at IS NULL')
      .andWhere(`DATE_TRUNC('day', "created_at") >= :date`, {
        date: oneMonthAgo,
      })
      .select(`DATE(created_at)`, 'date')
      .addSelect('count(DISTINCT id)', 'count')
      .groupBy('date')
      .getRawMany();
  }

  async findTGUser(): Promise<UserInterface[]> {
    return await getConnection('TG_USER_CONNECTION')
      .createQueryBuilder()
      .from(TgUserEntity, 'u')
      .where('deleted_at IS NULL')
      .andWhere(`DATE_TRUNC('day', "created_at") >= :date`, {
        date: oneMonthAgo,
      })
      .select(`DATE(created_at)`, 'date')
      .addSelect('count(DISTINCT id)', 'count')
      .groupBy('date')
      .getRawMany();
  }

  async formatResult(list: any[]): Promise<UserInterface[]> {
    return list.map((item) => {
      item.date = formatDate(item.date);
      return item;
    });
  }

  createOrUpdateAppUser(item: UserInterface) {
    const { date } = item;
    return this.userModel.findOneAndUpdate(
      { date },
      item,
      { upsert: true },
      function (err, doc) {
        if (err) return console.log('user save error');
        return console.log('user saved');
      },
    );
  }

  createOrUpdateTgUser(item: UserInterface) {
    const { date } = item;
    return this.tgUserModel.findOneAndUpdate(
      { date },
      item,
      { upsert: true },
      function (err, doc) {
        if (err) return console.log('tg user save error');
        return console.log('tg user saved');
      },
    );
  }

  createOrUpdateMany(users: UserInterface[], is_from_app: boolean) {
    users.map((user: UserInterface) => {
      is_from_app
        ? this.createOrUpdateAppUser(user)
        : this.createOrUpdateTgUser(user);
    });
  }

  cache() {
    this.find().then((users) => {
      this.formatResult(users).then((lists) => {
        this.createOrUpdateMany(lists, true);
      });
      console.log('All app users cached');
    });
  }

  cacheTgUser() {
    this.findTGUser().then((users) => {
      this.formatResult(users).then((lists) => {
        this.createOrUpdateMany(lists, false);
      });
      console.log('All tg users cached');
    });
  }

  delete() {
    return NODE_ENV === 'dev'
      ? this.userModel.deleteMany()
      : 'APP in Production';
  }
}
