import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthModule } from './modules/health.module';

@Global()
@Module({
  imports: [HealthModule],
  providers: [
    {
      provide: 'config',
      useValue: new ConfigService(),
    },
  ],
  exports: ['config'],
})
export class ConfigModule {}
