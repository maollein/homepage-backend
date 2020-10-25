import config from './config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import blogRouter from './controllers/blog';
const app = express();
app.use(express.json());
app.use(express.static(config.UI_BUILD_PATH));

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use('/api/blog', blogRouter);

app.get('*', (_req, res) => {
  res.sendFile(path.join(config.UI_BUILD_PATH, '/index.html'));
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});