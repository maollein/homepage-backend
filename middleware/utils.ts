import { Request, Response, NextFunction} from 'express';
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