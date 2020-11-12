import { Router } from 'express';
import db from '../db/db';
import { checkLogin } from '../middleware/utils';
import { parseNewBlog } from '../utils/parsers';

const blogRouter = Router();

blogRouter.get('/', async (_req, res) => {
  const result = await db.query('SELECT * FROM blog;', []);
  return res.json(result.rows);
});

blogRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await db.query('SELECT * FROM blog WHERE id=$1', [id]);
  if (result.rowCount !== 1) return res.status(404).json({ error: 'Not found' });
  else return res.json(result.rows[0]);
});

blogRouter.post('/', checkLogin, async (req, res) => {
  const blog = parseNewBlog(req.body);
  const result = await db.query(
    'INSERT INTO blog (title, content, user_id) VALUES ($1, $2, $3) RETURNING *;', 
    [blog.title, blog.content, req.userId]
  );
  return res.status(200).json(result.rows[0]);
});

export default blogRouter;