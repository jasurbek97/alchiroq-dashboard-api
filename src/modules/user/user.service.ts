import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getConnection } from 'typeorm';
import { NODE_ENV } from '../../environments/index';
import { formatDate, oneMonthAgo } from '../../utils/index';
import { UserEntity } from './entities/user.entity';
import { UserInterface } from './interfaces/user.interface';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll() {
    const users = await this.userModel
      .find()
      .select('date count')
      .sort({ date: 'asc' })
      .exec();

    const dates = [];
    const data = [];
    users.forEach(({ date, count }) => {
      if (!dates.includes(date)) dates.push(date);
      data.push(count);
    });
    return {
      dates: dates,
      data: data,
    };
  }

  async find(): Promise<UserInterface[]> {
    return await getConnection('userConnection')
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

  async formatResult(list: any[]): Promise<UserInterface[]> {
    return list.map((item) => {
      item.date = formatDate(item.date);
      return item;
    });
  }

  createOrUpdate(item: UserInterface) {
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

  createOrUpdateMany(users: UserInterface[]) {
    users.map((user: UserInterface) => {
      this.createOrUpdate(user);
    });
  }

  cache() {
    this.find().then((users) => {
      this.formatResult(users).then((lists) => {
        this.createOrUpdateMany(lists);
      });
      console.log('All users cached');
    });
  }

  delete() {
    return NODE_ENV === 'dev'
      ? this.userModel.deleteMany()
      : 'APP in Production';
  }
}
