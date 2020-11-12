import { Pool, QueryResult } from 'pg';

const pool = new Pool();

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