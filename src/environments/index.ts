import * as dotenv from 'dotenv';

dotenv.config();

const TIMEZONE: string = process.env.TIMEZONE || 'Asia/Tashkent';
const NODE_ENV: string = process.env.NODE_ENV || 'dev';
const PORT: number = +process.env.PORT || 5000;

const MONGO_HOST: string = process.env.MONGO_HOST || '';
const MONGO_PORT: number = +process.env.MONGO_PORT || 27017;
const MONGO_DATABASE: string = process.env.MONGO_DATABASE || '';

const THROTTLER: number = +process.env.THROTTLER || 60;
const THROTTLER_LIMIT: number = +process.env.THROTTLER_LIMIT || 10;
const CALLBACK_URL: string = process.env.CALLBACK_URL || '';

export {
  CALLBACK_URL,
  TIMEZONE,
  THROTTLER,
  THROTTLER_LIMIT,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  NODE_ENV,
  PORT,
};
