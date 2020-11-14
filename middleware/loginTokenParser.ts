import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { isLoginToken } from '../utils/typeguards';
import { parseLoginCookie } from '../utils/parsers';

const loginTokenParser = (req: Request, _res: Response, next: NextFunction): void => {
  const loginCookie = parseLoginCookie(req.signedCookies);
  if (loginCookie) {
    let decodedToken;
    try {
      decodedToken = jwt.verify(loginCookie, config.JWT_SECRET);
    } catch (e) {
      req.userId = null;
      return next();
    }
    if (isLoginToken(decodedToken)) {
      req.userId = decodedToken.id;
    }
    else {
      req.userId = null;
    }
  } else {
    req.userId = null;
  }
  return next();
};

export default loginTokenParser;