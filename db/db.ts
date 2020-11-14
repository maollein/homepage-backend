import { Pool, QueryResult } from 'pg';
import config from '../config';

const pool = new Pool({
  connectionString: config.DATABASE_URL
});

const closeDB = (): void => {
  pool.end(() => {
    console.log('Pool ended');
    process.exit();
  });
};

export default {
  query: (text: string, params: Array<string | number | null | undefined>): Promise<QueryResult> => {
    return pool.query(text, params);
  },
  closeDB
};