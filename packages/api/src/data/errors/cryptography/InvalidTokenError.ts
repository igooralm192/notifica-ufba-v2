import { BaseError } from '@/domain/helpers'

export class InvalidTokenError extends BaseError {
  constructor() {
    super('InvalidTokenError', 'Token inválido.')
  }
}
