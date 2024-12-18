import {
  ValidationPipe,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorResponse } from '../errors/ErrorResponse.errors';

export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
      exceptionFactory: (errors) => {
        const errorResponse = new ErrorResponse(
          HttpStatus.BAD_REQUEST.toString(),
          'Validation failed',
          errors,
        );
        return new BadRequestException(errorResponse);
      },
    });
  }
}
