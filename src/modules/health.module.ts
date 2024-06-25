import { Module } from '@nestjs/common';
import { IHealthRepository } from 'domain/src/model/health/health.repository';
import { GetHealthUsecase } from 'domain/src/usecase/health/get-health.usecase';
import { HealthController } from 'src/adapters/in/http/health/health.controller';
import { TypeOrmHealthRepository } from 'src/adapters/out/postgres/common/typeorm-health.repository';
import { HandlerGetServerHealth } from 'src/handler/health/get-server-health.handler';

@Module({
  providers: [
    TypeOrmHealthRepository,
    {
      provide: HandlerGetServerHealth,
      useFactory: (usecase: GetHealthUsecase) =>
        new HandlerGetServerHealth(usecase),
      inject: [GetHealthUsecase],
    },
    {
      provide: GetHealthUsecase,
      useFactory: (repository: IHealthRepository) =>
        new GetHealthUsecase(repository),
      inject: [TypeOrmHealthRepository],
    },
  ],
  controllers: [HealthController],
})
export class HealthModule {}
