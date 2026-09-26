import type { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/api-response.js';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Unhandled System Error:', err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Error interno del servidor';

  // Respuesta universal sin exponer stack traces ni detalles vulnerables del sistema
  ApiResponse.error(res, message, statusCode);
};
