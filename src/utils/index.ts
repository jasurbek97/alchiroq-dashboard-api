import { sumBy } from 'lodash';
import * as moment from 'moment-timezone';
import { TIMEZONE } from '../environments/index';

export function formatDate(date: Date) {
  return moment(date.toISOString()).tz(TIMEZONE).format('YYYY-MM-DD');
}

export const startOfMonth = formatDate(moment().startOf('month').toDate());
export const endOfMonth = formatDate(moment().endOf('month').toDate());

export function calculateRevenue(list: any, amount = 0): number {
  Object.keys(list).forEach((item) => {
    switch (item) {
      case '0007120':
        amount += sumBy(list[item], 'count') * 200;
      case '0007121':
        amount += sumBy(list[item], 'count') * 300;
      case '0007122':
        amount += sumBy(list[item], 'count') * 1000;
      case '0007123':
        amount += sumBy(list[item], 'count') * 2000;
      case '0007124':
        amount += sumBy(list[item], 'count') * 1000;
    }
  });
  return Math.floor((amount * 0.85) / 2);
}
