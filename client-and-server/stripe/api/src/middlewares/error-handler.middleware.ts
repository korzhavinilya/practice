import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/api.error';
import Logger from '../logger';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    const { status, message, errors } = err;
    Logger.error(`${err.message}: ${errors.join(', ')}`);
    res.status(status).json({ message, errors });
  } else {
    Logger.error(err.message);
    res
      .status(500)
      .json({ message: err.message ?? 'Oops. Unexpected exception!' });
  }
}
