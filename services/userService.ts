import db from '../db/db';
import { ILoginCounter, IUserLoggingIn } from '../types';

const getUserWithLoginCounter = async (username: string): Promise<IUserLoggingIn | null> => {
  const result = await db.query<IUserLoggingIn>(
    'SELECT * \
    FROM user_account \
    INNER JOIN login_counter ON (user_account.id = login_counter.user_id) \
    WHERE user_account.username=$1;',
    [username]
  );
  if (result.rows.length < 1)
    return null;
  return result.rows[0];
};

const updateLoginCounter = async (incrementOrLock: 'lock' | 'increment' | 'reset', userId: number):
  Promise<ILoginCounter> => {
  let query;
  switch (incrementOrLock) {
    case 'increment':
      query = 'UPDATE login_counter \
        SET login_count=login_count+1 \
        WHERE user_id=$1 \
        RETURNING *;';
      break;
    case 'lock':
      query = "UPDATE login_counter \
        SET login_count=0, locked_until=(NOW() AT TIME ZONE 'utc' + INTERVAL '10 minutes') \
        WHERE user_id=$1 \
        RETURNING *;";
      break;
    case 'reset':
      query = "UPDATE login_counter \
        SET login_count=0, locked_until=NULL \
        WHERE user_id=$1 \
        RETURNING *;";
      break;
  }
  const result = await db.query<ILoginCounter>(query, [userId]);
  return result.rows[0];
};

export default {
  getUserWithLoginCounter,
  updateLoginCounter
};