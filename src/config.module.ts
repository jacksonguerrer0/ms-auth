import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthModule } from './modules/health.module';
import { dynamoDBDocumentClient } from './adapters/out/dynamo/client';

@Global()
@Module({
  imports: [HealthModule],
  providers: [
    {
      provide: 'config',
      useValue: new ConfigService(),
    },
    {
      provide: 'dynamoClient',
      useValue: dynamoDBDocumentClient
    }
  ],
  exports: ['config', 'dynamoClient'],
})
export class ConfigModule {}
