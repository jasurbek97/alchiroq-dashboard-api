import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tournamentTransactionOptions } from '../../configs/typeorm/index';
import { Transaction, TransactionSchema } from './schemas/transaction.schema';
import { TasksService } from './tasks.service';
import { TournamentTransactionController } from './tournament-transaction.controller';
import { TournamentTransactionService } from './tournament-transaction.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...tournamentTransactionOptions,
      name: 'TOURNAMENT_CONNECTION',
    }),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [TournamentTransactionController],
  providers: [TournamentTransactionService, TasksService],
})
export class TournamentTransactionModule {}
