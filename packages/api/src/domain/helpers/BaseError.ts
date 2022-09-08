export class BaseError implements Error {
  name: string

  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly context?: { key: string; value: any },
    public readonly stack?: string,
  ) {
    this.name = code
  }
}
