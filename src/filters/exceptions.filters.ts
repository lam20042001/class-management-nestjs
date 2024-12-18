import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from '../errors/ErrorResponse.errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse: ErrorResponse = {
      errorCode: status.toString(),
      devMessage:
        exception instanceof Error
          ? exception.message
          : 'Internal server error',
      data: exception instanceof HttpException ? exception.getResponse() : null,
    };

    response.status(status).json(errorResponse);
  }
}
