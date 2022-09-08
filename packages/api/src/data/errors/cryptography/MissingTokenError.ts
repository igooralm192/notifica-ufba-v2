import { BaseError } from '@/domain/helpers'

export class MissingTokenError extends BaseError {
  constructor() {
    super('MissingTokenError', 'Token não existe.')
  }
}
