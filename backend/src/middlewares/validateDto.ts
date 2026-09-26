import type { Request, Response, NextFunction } from 'express';
import { ZodError, type ZodSchema } from 'zod';
import { ApiResponse, type FieldError } from '../utils/api-response.js';

export type ValidationTarget = 'body' | 'params' | 'query';

export const validateDto = (schema: ZodSchema, target: ValidationTarget = 'body') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (target === 'body') {
        req.body = await schema.parseAsync(req.body);
      } else if (target === 'params') {
        req.params = (await schema.parseAsync(req.params)) as any;
      } else if (target === 'query') {
        req.query = (await schema.parseAsync(req.query)) as any;
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details: FieldError[] = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        ApiResponse.error(res, 'Error de validación en la petición', 400, details);
        return;
      }
      next(error);
    }
  };
};

export const validateBody = (schema: ZodSchema) => validateDto(schema, 'body');
export const validateParams = (schema: ZodSchema) => validateDto(schema, 'params');
