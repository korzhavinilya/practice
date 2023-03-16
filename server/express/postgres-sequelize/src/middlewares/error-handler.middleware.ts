import { NextFunction, Request, Response } from 'express';
import ApiError from '../exceptions/api.error';

function errorHandler(
  err: TypeError | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (err instanceof ApiError) {
    const { status, message, errors } = err;

    return res.status(status).json({ message, errors });
  }

  return res.status(500).json({ message: 'Oops. Unexpected exception!' });
}

export default errorHandler;
