import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TournamentTransactionService } from './tournament-transaction.service';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  @Inject() private readonly transactionService: TournamentTransactionService;

  @Cron(CronExpression.EVERY_5_MINUTES)
  async transactionCache() {
    await this.transactionService.cacheMonth();
    this.logger.debug(`tournament transaction cached`);
  }
}
