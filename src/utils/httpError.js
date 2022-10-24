import { logger } from '.';

const handleHttpError = (error, res) => {

  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Something went wrong";

  logger.error(error.errorInstance.stack || errorMessage);

  return res.status(statusCode).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: process.env.NODE_ENV === 'development' ? error.stack : {}
  });
};

export default handleHttpError;
