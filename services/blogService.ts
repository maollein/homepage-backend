import db from '../db/db';
import { IBlogPost } from '../types';

const getAllPosts = async (): Promise<IBlogPost[]> => {
  const result = await db.query<IBlogPost>("SELECT * FROM blog;", []);
  return result.rows;
};

const getPostCount = async (): Promise<{ count: number }> => {
  const result = await db.query<{ count: number }>("SELECT COUNT(*) FROM blog;", []);
  return result.rows[0];
};

/**
 * Returns a list of all the months
 * that a blogpost has been written in.
 * Format is YYYY-MM, order descending.
 */
const getMonthsWhenPostsWritten = async (): Promise<string[]> => {
  const result = await db.query<{ month: string }>(
    "SELECT DISTINCT to_char(created_at, 'YYYY-MM') AS MONTH FROM blog ORDER BY month DESC;",
    []);
  return result.rows.map(row => row.month);
};

/**
 * 
 * @param month String in the format YYYY-MM
 */
const getPostsByMonth = async (month: string): Promise<IBlogPost[]> => {
  const result = await db.query<IBlogPost>("SELECT * FROM blog WHERE to_char(created_at, 'YYYY-MM')=$1;", [month]);
  return result.rows;
};

const getPostsByPage = async (page: number): Promise<IBlogPost[]> => {
  const limit = 5;
  const offset = limit * (page - 1);
  const result = await db.query<IBlogPost>("SELECT * FROM blog ORDER BY created_at DESC LIMIT 5 OFFSET $1;", [offset]);
  return result.rows;
};

export default {
  getPostCount,
  getMonthsWhenPostsWritten,
  getPostsByMonth,
  getPostsByPage,
  getAllPosts
};