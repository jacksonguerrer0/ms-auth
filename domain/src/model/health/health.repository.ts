export interface IHealthRepository {
  check(): Promise<boolean>;
}
