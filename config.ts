import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config();

interface IConfig {
  PORT: string;
  JWT_SECRET: string;
  UI_BUILD_PATH: string;
}

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
let UI_BUILD_PATH;

if (process.env.NODE_ENV === 'production') {
  UI_BUILD_PATH = path.resolve(__dirname, '../build_ui/');
} else UI_BUILD_PATH = path.join(__dirname, '/build_ui/');

export default {
  PORT,
  JWT_SECRET,
  UI_BUILD_PATH
} as IConfig;