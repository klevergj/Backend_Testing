import type { Response } from 'express';

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  message?: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    details?: FieldError[] | any;
  };
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200
  ): Response {
    const payload: ApiSuccessResponse<T> = {
      success: true,
      ...(message ? { message } : {}),
      data,
    };
    return res.status(statusCode).json(payload);
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 500,
    details?: FieldError[] | any
  ): Response {
    const payload: ApiErrorResponse = {
      success: false,
      error: {
        message,
        ...(details !== undefined ? { details } : {}),
      },
    };
    return res.status(statusCode).json(payload);
  }
}
