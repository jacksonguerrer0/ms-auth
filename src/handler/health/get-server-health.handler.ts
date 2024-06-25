import { Inject, Injectable } from '@nestjs/common';
import { GetHealthUsecase } from 'domain/src/usecase/health/get-health.usecase';

@Injectable()
export class HandlerGetServerHealth {
  constructor(
    @Inject(GetHealthUsecase)
    private readonly getHealthUseCase: GetHealthUsecase,
  ) {}

  async execute(): Promise<boolean> {
    const result = await this.getHealthUseCase.apply();
    return result;
  }
}
