import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getConnection } from 'typeorm';
import { ActivityEntity } from './entities/activity.entity';
import { Activity, ActivityDocument } from './schemas/activity.schema';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
  ) {}

  async findAll() {
    return await this.activityModel
      .find()
      .select('action date count')
      .sort({ date: -1 })
      .exec();
  }

  delete() {
    return `This action removes a activity`;
  }

  async cache() {
    return await getConnection('LOG_CONNECTION')
      .createQueryBuilder()
      .from(ActivityEntity, 'a')
      .where('action = :action', { action: 'rub_double' })
      .andWhere(`DATE_TRUNC('day', "created_at") = :date`, {
        date: '2021-12-18',
      })
      .select('action')
      .addSelect('created_at', 'date')
      .addSelect(`count(*)`, 'count')
      .groupBy('date')
      .addGroupBy('action')
      .getRawOne();
  }
}
