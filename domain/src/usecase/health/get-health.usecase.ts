import { IHealthRepository } from "domain/src/model/health/health.repository";

export class GetHealthUsecase {
  constructor(private healthRepository: IHealthRepository) {}

  async apply(): Promise<boolean> {
    return this.healthRepository.check();
  }
}
