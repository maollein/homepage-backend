import { CookieOptions, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/db';
import { parseLoginInfo } from '../utils/parsers';
import { IUser } from '../types';
import config from '../config';
import { loginError } from '../utils/utils';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const loginInfo = parseLoginInfo(req.body);
  const result = await db.query(
    'SELECT * FROM user_account WHERE username=$1',
    [loginInfo.username]
  );

  const user = result.rows[0] as IUser | undefined;

  const passwordMatch = user === undefined
    ? false
    : await bcrypt.compare(loginInfo.password, user.password);

  if (!user || !passwordMatch)
    throw loginError();

  const userForToken = {
    username: user.username,
    name: user.name,
    id: user.id
  };
  const token = jwt.sign(userForToken, config.JWT_SECRET, {expiresIn: '2d'});

  const cookieOptions: CookieOptions = {
    httpOnly: true,
    signed: true
  };

  if (process.env.NODE_ENV !== 'development') {
    cookieOptions.sameSite = 'strict';
    cookieOptions.secure = true;
  }

  res.cookie('login', token, cookieOptions);
  return res.json({username: user.username, name: user.name, id: user.id });
});

export default loginRouter;