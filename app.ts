import config from './config';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import blogRouter from './controllers/blog';
import loginRouter from './controllers/login';
import { errorHandler } from './middleware/errorHandler';
import loginTokenParser from './middleware/loginTokenParser';
import { defaultEndpoint } from './middleware/utils';

const app = express();
app.use(express.json());
app.use(loginTokenParser);
app.use(express.static(config.UI_BUILD_PATH));

if (process.env.NODE_ENV === 'development') {
  app.use(cors());
}

app.use('/api/blog', blogRouter);
app.use('/api/login', loginRouter);

app.get('*', (_req, res) => {
  res.sendFile(path.join(config.UI_BUILD_PATH, '/index.html'));
});

app.use(errorHandler);
app.use(defaultEndpoint);

export default app;