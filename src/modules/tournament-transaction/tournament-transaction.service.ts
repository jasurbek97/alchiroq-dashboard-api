import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getConnection } from 'typeorm';
import { NODE_ENV } from '../../environments/index';
import { formatDate, oneMonthAgo } from '../../utils/index';
import { TournamentTransaction } from './entities/tournament-transaction.entity';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';

@Injectable()
export class TournamentTransactionService {
  @InjectModel(Transaction.name)
  private readonly transactionModel: Model<TransactionDocument>;

  async findAll() {
    const date = new Date();
    const dateFrom = formatDate(
      new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()),
    );

    const data = await this.transactionModel
      .find({
        date: {
          $gte: dateFrom,
        },
      })
      .select('date count amount user_count')
      .sort({ date: 'asc' })
      .exec();

    const dates = [];
    const transactions = [];
    const amounts = [];
    const users = [];

    data.map((item) => {
      dates.push(item.date);
      transactions.push(item.count);
      users.push(item.user_count);
      amounts.push(item.amount);
    });
    return {
      dates,
      transactions,
      users,
      amounts,
    };
  }

  delete() {
    return NODE_ENV === 'dev'
      ? this.transactionModel.deleteMany()
      : 'APP in Production';
  }

  async cacheMonth() {
    const transactions = await getConnection('TOURNAMENT_CONNECTION')
      .createQueryBuilder()
      .from(TournamentTransaction, 'u')
      .where('deleted_at IS NULL')
      .andWhere('payment_system IS NOT NULL')
      .andWhere(`DATE_TRUNC('day', "created_at") >= :date`, {
        date: oneMonthAgo,
      })
      .select(`DATE(created_at)`, 'date')
      .addSelect('count(DISTINCT id)', 'count')
      .addSelect('count(DISTINCT user_id)', 'user_count')
      .addSelect('round(sum(amount) / 100, 0)', 'amount')
      .groupBy('date')
      .getRawMany();
    const formatted = this.format(transactions);
    return this.createOrUpdateMany(formatted);
  }

  createOrUpdate(item: TransactionInterface) {
    const { date } = item;
    return this.transactionModel.findOneAndUpdate(
      { date },
      item,
      { upsert: true },
      function (err, doc) {
        if (err) return console.log('tournament transaction save error');
        return console.log('tournament transaction saved');
      },
    );
  }

  createOrUpdateMany(items: TransactionInterface[]) {
    items.map((transaction: TransactionInterface) => {
      this.createOrUpdate(transaction);
    });
  }

  format(transactions: any[]) {
    return transactions.map((item) => {
      item.date = formatDate(item.date);
      item.count = +item.count;
      item.amount = +item.amount;
      item.user_count = +item.user_count;
      return item;
    });
  }
}
