import { Module } from '@nestjs/common';
import { GetHealthUsecase } from 'domain/src/usecase/health/get-health.usecase';
import { HealthController } from 'src/adapters/in/http/health/health.controller';
import { HandlerGetServerHealth } from 'src/handler/health/get-server-health.handler';

@Module({
  providers: [
    GetHealthUsecase,
    {
      provide: HandlerGetServerHealth,
      useFactory: (usecase: GetHealthUsecase) =>
        new HandlerGetServerHealth(usecase),
      inject: [GetHealthUsecase],
    },
  ],
  controllers: [HealthController],
})
export class HealthModule {}
