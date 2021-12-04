import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DeviceService } from './device.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly deviceService: DeviceService) {}

  @Cron(CronExpression.EVERY_HOUR)
  async deviceCache() {
    await this.deviceService.cache();
    this.logger.debug(`Device list is cached in every day`);
  }
}
