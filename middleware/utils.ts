import { Request, Response, NextFunction} from 'express';
import { isNumber } from '../utils/typeguards';

export const checkLogin = (req: Request, res: Response, next: NextFunction): Response | void => {
  if (!isNumber(req.userId) || isNaN(req.userId))
    return res.status(401).json({ error: 'Unauthorized' });
  else
    return next();
};