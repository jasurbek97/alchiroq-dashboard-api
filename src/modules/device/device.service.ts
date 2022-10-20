import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getConnection } from 'typeorm';
import { NODE_ENV } from '../../environments/index';
import { DeviceEntity } from './entities/device.entity';
import { DeviceInterface } from './interfaces/device.interface';
import { Device, DeviceDocument } from './schemas/device.schema';

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(Device.name) private deviceModel: Model<DeviceDocument>,
  ) {}

  async findAll() {
    return await this.deviceModel
      .find()
      .select('device count')
      .sort({ count: -1 })
      .exec();
  }

  async find(): Promise<DeviceInterface[]> {
    return await getConnection('deviceConnection')
      .createQueryBuilder()
      .from(DeviceEntity, 'd')
      .where('deleted_at IS NULL')
      .select(`split_part(initcap(user_agent), '/', 1)`, 'device')
      .addSelect('count(DISTINCT id)', 'count')
      .groupBy('device')
      .orderBy('count', 'DESC')
      .getRawMany();
  }

  async arraySplit(list: any[], count: number): Promise<DeviceInterface[]> {
    const result = [];
    const last = { device: 'Other', count: 0 };
    list.forEach((item, i) => {
      item.count = +item.count;
      if (i <= count - 1) result.push(item);
      else last.count += item.count;
    });
    result.push(last);
    return result;
  }

  createOrUpdate(item: DeviceInterface) {
    const { device } = item;
    return this.deviceModel.findOneAndUpdate(
      { device },
      item,
      { upsert: true },
      function (err, doc) {
        if (err) return console.log('device save error');
        return console.log('device saved');
      },
    );
  }

  createOrUpdateMany(items: DeviceInterface[]) {
    items.map((device: DeviceInterface) => {
      this.createOrUpdate(device);
    });
  }

  async cache() {
    this.find().then((result) => {
      this.arraySplit(result, 3).then((devices: DeviceInterface[]) => {
        this.createOrUpdateMany(devices);
        console.log('All devices cached');
      });
    });
  }

  delete() {
    return NODE_ENV === 'dev'
      ? this.deviceModel.deleteMany()
      : 'APP in Production';
  }
}
