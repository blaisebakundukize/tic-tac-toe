import createError from 'http-errors';
import { handleHttpError } from '../utils';

const errorHandler = (error, req, res, next) => {
  if (createError.isHttpError(error)) handleHttpError(error, res);
  return next()
}

export default errorHandler;
