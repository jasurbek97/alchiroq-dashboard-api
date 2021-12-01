import * as moment from 'moment-timezone';
import { TIMEZONE } from '../environments/index';

export function formatDate(date: Date) {
  return moment(date.toISOString()).tz(TIMEZONE).format('YYYY-MM-DD');
}
