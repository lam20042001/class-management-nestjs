import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ErrorResponse } from '../errors/ErrorResponse.errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorDetail = exception instanceof HttpException? exception.getResponse() : 'Internal Server Error';
    const devMessage = typeof errorDetail === 'string' ? errorDetail : (errorDetail as any).message || 'Unexpected error occured';

    const errorResponse: ErrorResponse = {
      errorCode: status.toString(),
      devMessage: devMessage,
      data: request.body,
    };

    response.status(status).json(errorResponse);
  }
}
