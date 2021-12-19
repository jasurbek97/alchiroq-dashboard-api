import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { filter, groupBy } from 'lodash';
import { Model } from 'mongoose';
import { getRepository } from 'typeorm';
import { NODE_ENV } from '../../environments/index';
import {
  calculateRevenue,
  endOfMonth,
  formatDate,
  startOfMonth,
} from '../../utils/index';
import { ChargeEntity } from './entities/charge.entity';
import { ChargeInterface } from './interfaces/charge.interface';
import { Charge, ChargeDocument } from './schemas/charge.schema';

@Injectable()
export class ChargeService {
  constructor(
    @InjectModel(Charge.name) private chargeModel: Model<ChargeDocument>,
  ) {}

  async findAll(): Promise<Charge[]> {
    return this.chargeModel
      .find()
      .select('tariff date status count')
      .sort({ date: -1 })
      .exec();
  }

  async revenue(): Promise<any> {
    const charges = await this.chargeModel
      .find({
        status: 'ESME_ROK',
        date: { $gte: startOfMonth, $lte: endOfMonth },
      })
      .select('tariff date count')
      .sort({ tariff: 'asc' })
      .exec();
    return calculateRevenue(charges);
  }

  async findByTariff(tariff: string): Promise<any> {
    const date = new Date();
    const dateFrom = formatDate(
      new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()),
    );
    const charges = await this.chargeModel
      .find({
        tariff: tariff,
        date: {
          $gte: dateFrom,
        },
      })
      .select('date status count')
      .sort({ date: 'asc' })
      .exec();

    const dates = [];
    const charged = [];
    const uncharged = [];
    charges.forEach(({ date, status, count }) => {
      if (!dates.includes(date)) dates.push(date);
      status === 'CREATED' ? uncharged.push(count) : charged.push(count);
    });
    return {
      dates: dates,
      charged: charged,
      uncharged: uncharged,
    };
  }

  async findByAllTariffs({ from, to }) {
    const charges = await this.chargeModel
      .find({
        date: {
          $gte: from,
          $lt: to,
        },
      })
      .select('date status count tariff')
      .sort({ date: -1 })
      .exec();

    const dates = Object.keys(groupBy(charges, 'date'));
    return dates.map((item) => {
      return {
        date: item,
        '0007120': {
          CHARGED:
            filter(charges, {
              date: item,
              tariff: '0007120',
              status: 'ESME_ROK',
            })[0]?.count ?? 0,
          UNCHARGED:
            filter(charges, {
              date: item,
              tariff: '0007120',
              status: 'CREATED',
            })[0]?.count ?? 0,
        },
        '0007121': {
          CHARGED:
            filter(charges, {
              date: item,
              tariff: '0007121',
              status: 'ESME_ROK',
            })[0]?.count ?? 0,
          UNCHARGED:
            filter(charges, {
              date: item,
              tariff: '0007121',
              status: 'CREATED',
            })[0]?.count ?? 0,
        },
        '0007122': {
          CHARGED:
            filter(charges, {
              date: item,
              tariff: '0007122',
              status: 'ESME_ROK',
            })[0]?.count ?? 0,
          UNCHARGED:
            filter(charges, {
              date: item,
              tariff: '0007122',
              status: 'CREATED',
            })[0]?.count ?? 0,
        },
        '0007123': {
          CHARGED:
            filter(charges, {
              date: item,
              tariff: '0007123',
              status: 'ESME_ROK',
            })[0]?.count ?? 0,
          UNCHARGED:
            filter(charges, {
              date: item,
              tariff: '0007123',
              status: 'CREATED',
            })[0]?.count ?? 0,
        },
        '0007124': {
          CHARGED:
            filter(charges, {
              date: item,
              tariff: '0007124',
              status: 'ESME_ROK',
            })[0]?.count ?? 0,
          UNCHARGED:
            filter(charges, {
              date: item,
              tariff: '0007124',
              status: 'CREATED',
            })[0]?.count ?? 0,
        },
      };
    });
  }

  async findByTariffToday(tariff: string): Promise<Charge[]> {
    return await this.chargeModel
      .find({ tariff: tariff, date: formatDate(new Date()) })
      .select('status count')
      .sort({ status: -1 })
      .exec();
  }

  async cache(dates: string[], sign = '=') {
    const charges = await getRepository(ChargeEntity)
      .createQueryBuilder('ch')
      .where(`DATE_TRUNC('day', "date") IN (:...dates)`, {
        dates,
      })
      .andWhere(`status ${sign} :status`, { status: 'CREATED' })
      .select(`tariff`)
      .addSelect('date')
      .addSelect('count(*)', 'count')
      .groupBy('date')
      .addGroupBy('tariff')
      .getRawMany();

    charges.map((item) => {
      item.date = formatDate(item.date);
      item.status = sign === '=' ? 'CREATED' : 'ESME_ROK';
      this.update(item);
      return item;
    });
    return charges;
  }

  update(item: ChargeInterface) {
    const { tariff, status, date } = item;
    return this.chargeModel.findOneAndUpdate(
      { tariff, status, date },
      item,
      { upsert: true },
      function (err, doc) {
        if (err) return console.log('charge error');
        return console.log('charge saved');
      },
    );
  }

  delete() {
    return NODE_ENV === 'dev'
      ? this.chargeModel.deleteMany()
      : 'APP in Production';
  }
}
