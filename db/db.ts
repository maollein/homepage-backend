import { Pool, PoolConfig, QueryResult, types } from 'pg';
import config from '../config';

const poolConfig: PoolConfig = {
  connectionString: config.DATABASE_URL,
};

if (process.env.NODE_ENV !== 'development')
  poolConfig.ssl = { rejectUnauthorized: false };

// Overriding pg default date parsing so that no
// time zone conversions are made to our
// precious UTC timestamps.
types.setTypeParser(1114, stringValue => {
  return new Date(Date.parse(stringValue + "+0000"));
});

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