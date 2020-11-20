import { Pool, PoolConfig, QueryResult } from 'pg';
import config from '../config';

const poolConfig: PoolConfig = {
  connectionString: config.DATABASE_URL,
};

if (process.env.NODE_ENV !== 'development')
  poolConfig.ssl = { rejectUnauthorized: false };

const pool = new Pool(poolConfig);

const closeDB = (): void => {
  pool.end(() => {
    console.log('Pool ended');
    process.exit();
  });
};

export default {
  query: <T>(text: string, params: Array<string | number | null | undefined>): Promise<QueryResult<T>> => {
    return pool.query(text, params);
  },
  pool,
  closeDB
};