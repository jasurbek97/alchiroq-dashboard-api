import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from './user.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private readonly userService: UserService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async usersCache() {
    await this.userService.cache();
    this.logger.debug(`Users list is cached in every 10 minutes`);
  }
}
