import { createHttpTerminator } from 'http-terminator';
import config from './config';
import db from './db/db';
import app from './app';

const server = app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

const httpTerminator = createHttpTerminator({
  server
});

const shutdown = async () => {
  await httpTerminator.terminate();
  await db.closeDB();
  console.log('Clean shutdown');
  process.exit();
};

// on local windows
process.on('SIGINT', () => {
  void shutdown();
});

process.on('SIGTERM', () => {
  void shutdown();
});