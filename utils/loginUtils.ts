import bcrypt from 'bcrypt';
import { CookieOptions } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { IUserLoggingIn } from '../types';
import { loginError } from './utils';

export const compareAndFail = async (): Promise<void> => {
  await bcrypt.compare('wasteMyTime', config.FAKE_PASSWORD_HASH);
  throw loginError();
};

export const getJWT = (user: IUserLoggingIn): string => {
  const userForToken = {
    username: user.username,
    name: user.name,
    id: user.id
  };
  const token = jwt.sign(userForToken, config.JWT_SECRET, { expiresIn: '2d' });
  return token;
};

export const getLoginCookieOptions = (): CookieOptions => {
  const cookieOptions: CookieOptions = {
    httpOnly: true,
    signed: true,
  };
  if (process.env.NODE_ENV !== 'development') {
    cookieOptions.sameSite = 'strict';
    cookieOptions.secure = true;
  }
  return cookieOptions;
};