import { Request, Response, NextFunction } from 'express';
import { isNumber } from '../utils/typeguards';

export const checkLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
  if (!isNumber(req.userId) || isNaN(req.userId))
    return res.status(403).json({ error: 'Forbidden' });
  else
    return next();
};

export const defaultEndpoint = (_req: Request, res: Response): Response => {
  return res.status(404).json({ error: 'No such endpoint' });
};

export const redirectHttpToHttps = (req: Request, res: Response, next: NextFunction): void => {
  if (req.header('x-forwarded-proto') === 'http') {
    return res.redirect(301, `https://${req.hostname}${req.url}`);
  }
  return next();
};