import { BaseError } from '@/domain/helpers'

export class ConnectionNotFoundError extends BaseError {
  constructor() {
    super(
      'ConnectionNotFoundError',
      'Conexão com banco de dados não foi encontrada.',
    )
  }
}
