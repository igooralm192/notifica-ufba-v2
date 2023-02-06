export type BaseErrorContext<V = any> = { key: string; value: V }

export class BaseError implements Error {
  name: string

  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly context?: BaseErrorContext | BaseErrorContext[],
    public readonly stack?: string,
    public description?: string,
  ) {
    this.name = code
  }
}
