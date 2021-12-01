import * as dotenv from 'dotenv';

dotenv.config();

const TIMEZONE: string = process.env.TIMEZONE || 'Asia/Tashkent';
const NODE_ENV: string = process.env.NODE_ENV || 'dev';
const PORT: number = +process.env.PORT || 5000;

const MONGO_DOC_URL: string = process.env.MONGO_DOC_URL || '';
const MONGO_DOC_CON: string = process.env.MONGO_DOC_CON || '';

const THROTTLER: number = +process.env.THROTTLER || 60;
const THROTTLER_LIMIT: number = +process.env.THROTTLER_LIMIT || 10;
const CALLBACK_URL: string = process.env.CALLBACK_URL || '';

export {
  CALLBACK_URL,
  TIMEZONE,
  THROTTLER,
  THROTTLER_LIMIT,
  MONGO_DOC_URL,
  MONGO_DOC_CON,
  NODE_ENV,
  PORT,
};
