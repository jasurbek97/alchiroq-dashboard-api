import { sum } from 'lodash';
import * as moment from 'moment-timezone';
import { TIMEZONE } from '../environments/index';

export function formatDate(date: Date) {
  return moment(date.toISOString()).tz(TIMEZONE).format('YYYY-MM-DD');
}

export const startOfMonth = formatDate(moment().startOf('month').toDate());
export const endOfMonth = formatDate(moment().endOf('month').toDate());

export function calculateRevenue(list: any): number {
  const result = {};
  const tariffs = {
    '0007120': 200,
    '0007121': 300,
    '0007122': 1000,
    '0007123': 2000,
    '0007124': 3000,
  };
  list.forEach((item) => {
    if (result[item.tariff]) result[item.tariff] += +item.count;
    else result[item.tariff] = +item.count;
  });
  const totalCounters = Object.keys(result).map(
    (key) => result[key] * tariffs[key],
  );
  const totalCount = sum(totalCounters);
  return Math.floor((totalCount * 0.85) / 2);
}
