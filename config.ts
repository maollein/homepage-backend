import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config();

interface IConfig {
  PORT: string;
  JWT_SECRET: string;
  UI_BUILD_PATH: string;
  DATABASE_URL: string;
  COOKIE_SECRET: string;
}

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const DATABASE_URL = process.env.DATABASE_URL;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
let UI_BUILD_PATH;

if (process.env.NODE_ENV === 'production') {
  UI_BUILD_PATH = path.resolve(__dirname, '../build_ui/');
} else UI_BUILD_PATH = path.join(__dirname, '/build_ui/');

export default {
  PORT,
  JWT_SECRET,
  UI_BUILD_PATH,
  DATABASE_URL,
  COOKIE_SECRET
} as IConfig;