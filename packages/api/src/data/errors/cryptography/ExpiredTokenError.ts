import { BaseError } from '@/domain/helpers'

export class ExpiredTokenError extends BaseError {
  constructor() {
    super('ExpiredTokenError', 'Token expirado.')
  }
}
