import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { formatDate } from 'src/utils';
import { ChargeService } from './charge.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly chargeService: ChargeService) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async chargeCacheToday() {
    const dates = [formatDate(new Date())];
    await this.chargeService.cache(dates);
    await this.chargeService.cache(dates, '!=');
    this.logger.debug(`Charges with ${dates} is cached in every 5 MINUTES`);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async chargeCacheOld() {
    const dates = [
      '2021-11-10',
      '2021-11-11',
      '2021-11-12',
      '2021-11-13',
      '2021-11-14',
      '2021-11-15',
      '2021-11-16',
      '2021-11-17',
      '2021-11-18',
      '2021-11-19',
      '2021-11-20',
      '2021-11-21',
      '2021-11-22',
      '2021-11-23',
      '2021-11-24',
      '2021-11-25',
      '2021-11-26',
      '2021-11-27',
      '2021-11-28',
      '2021-11-29',
      '2021-11-30',
    ];
    await this.chargeService.cache(dates);
    await this.chargeService.cache(dates, '!=');
    this.logger.debug(`Charges with ${dates} and is cached in every 5 MINUTES`);
  }
}
