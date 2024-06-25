import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CommonsModule } from './commons/common.module';
import { ResponseInterceptor } from './commons/interceptors/response-http.interceptor';
import { ConfigModule } from './config.module';

@Module({
  imports: [CommonsModule, ConfigModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule {}
