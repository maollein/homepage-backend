import { Router } from 'express';
import db from '../db/db';
import { checkLogin } from '../middleware/utils';
import blogService from '../services/blogService';
import { IBlogPost } from '../types';
import { parseNewBlog } from '../utils/parsers';
import { isPositiveNumber, isString } from '../utils/typeguards';

const blogRouter = Router();

// TODO move all db queries to blogService

blogRouter.get('/', async (req, res) => {
  let posts: IBlogPost[];
  if (isString(req.query.month)) {
    posts = await blogService.getPostsByMonth(req.query.month);
  } else if (isPositiveNumber(Number(req.query.page))) {
    posts = await blogService.getPostsByPage(Number(req.query.page));
  } else {
    posts = await blogService.getPostsByPage(1);
  }
  if (posts.length < 1) return res.status(404).json({ error: 'Not found' });
  return res.json(posts);
});

blogRouter.get('/months', async (_req, res) => {
  const months = await blogService.getMonthsWhenPostsWritten();
  return res.json(months);
});

blogRouter.get('/postcount', async (_req, res) => {
  const count = await blogService.getPostCount();
  return res.json(count);
});

blogRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await db.query<IBlogPost>('SELECT * FROM blog WHERE id=$1', [id]);
  if (result.rowCount !== 1) return res.status(404).json({ error: 'Not found' });
  else return res.json(result.rows[0]);
});

blogRouter.post('/', checkLogin, async (req, res) => {
  const blog = parseNewBlog(req.body);
  const result = await db.query<IBlogPost>(
    'INSERT INTO blog (title, content, user_id) VALUES ($1, $2, $3) RETURNING *;',
    [blog.title, blog.content, req.userId]
  );
  return res.status(200).json(result.rows[0]);
});

blogRouter.delete('/:id', checkLogin, async (req, res) => {
  const result = await db.query<{ user_id: number }>('SELECT user_id FROM blog WHERE id=$1;', [req.params.id]);
  if (result.rowCount === 0) return res.status(404).json({ error: 'Not found' });
  if (result.rows[0].user_id === req.userId) {
    await db.query('DELETE FROM blog WHERE id=$1;', [req.params.id]);
    return res.json({ response: 'Post deleted' });
  } else return res.status(403).json({ error: 'Forbidden' });
});

export default blogRouter;