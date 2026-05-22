import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export const errorHandler = (err: Error | HttpError, req: Request, res: Response, next: NextFunction) => {
  const status = 'status' in err && typeof err.status === 'number' ? err.status : 500;
  const message = err.message || 'Internal server error';

  console.error(err);

  res.status(status).json({
    success: false,
    error: message,
    details: process.env.NODE_ENV === 'production' ? undefined : err,
  });
};
