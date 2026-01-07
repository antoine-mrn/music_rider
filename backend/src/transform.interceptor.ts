import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

export interface TransformResponse<T> {
  success: boolean;
  status: number;
  data: T;
  meta?: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    nextPage: string | null;
    previousPage: string | null;
    timestamp: Date;
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  TransformResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TransformResponse<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        status: response.statusCode,
        data,
      })),
    );
  }
}
