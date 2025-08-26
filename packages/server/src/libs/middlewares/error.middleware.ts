import { Request, Response } from 'express';

interface HttpError extends Error {
  status?: number;
  errors?: unknown;
}

const errorHandler = (error: HttpError, req: Request, res: Response) => {
  const statusCode = error.status || 500;
  const message = error.message || 'An unexpected error occurred';
  const errors = error.errors || null;
  console.error(`[Error] ${statusCode}: ${message}`, errors || '', error.stack);

  res.status(statusCode).json({
    error: message,
    ...(errors && { details: errors }),
  });
};

export default errorHandler;
