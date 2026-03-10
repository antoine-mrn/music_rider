import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { status, message } = this.getErrorDetails(exception.code);

    response.status(status).json({
      success: false,
      statusCode: status,
      error: {
        code: exception.code,
        message,
      },
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }

  private getErrorDetails(code: string): { status: number; message: string } {
    switch (code) {
      case 'P2002':
        return {
          status: HttpStatus.CONFLICT,
          message: 'Cette ressource existe déjà',
        };
      case 'P2003':
        return {
          status: HttpStatus.BAD_REQUEST,
          message: 'Référence invalide',
        };
      case 'P2025':
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Ressource introuvable',
        };
      default:
        return {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Erreur base de données',
        };
    }
  }
}
