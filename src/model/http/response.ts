export class HTTPResponse<T = any> {
  constructor(
    public readonly status: number,
    public readonly message: string,
    public readonly data?: T,
    public readonly metadata?: any,
  ) {}
}
