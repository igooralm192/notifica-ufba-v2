import { BaseError } from '@/domain/helpers'

export class ValidationError extends BaseError {
  constructor(message: string, context?: { key: string; value: string }) {
    super('ValidationError', message, context)
  }
}
