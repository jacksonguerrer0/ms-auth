import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HTTPResponse } from 'src/model/http/response';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data: HTTPResponse) => {
        const statusCode = data.status || response.statusCode || HttpStatus.OK;
        response.status(statusCode).json({
          ...data,
          timestamp: new Date().toISOString(),
          data: data.data || {},
        });
      }),
    );
  }
}
