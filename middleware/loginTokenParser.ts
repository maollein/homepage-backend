import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { isLoginToken } from '../utils/typeguards';

const loginTokenParser = (req: Request, _res: Response, next: NextFunction): void => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    let decodedToken; 
    try {
      decodedToken = jwt.verify(token, config.JWT_SECRET);
    } catch (e) {
      req.userId = null;
      return next();
    }
    if (isLoginToken(decodedToken)) {
      console.log(decodedToken);
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