import { Request, Response, NextFunction } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  // ! TODO : Add Logger for debug purpose
  next();
}
