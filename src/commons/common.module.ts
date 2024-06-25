import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvVariables } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvVariables,
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class CommonsModule {}
