import config from './config';
import db from './db/db';
import app from './app';

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

process.on('SIGINT', () => {
  db.closeDB();
});

process.on('SIGTERM', () => {
  db.closeDB();
});