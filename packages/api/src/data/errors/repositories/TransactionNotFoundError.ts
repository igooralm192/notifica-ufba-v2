import { BaseError } from '@/domain/helpers'

export class TransactionNotFoundError extends BaseError {
  constructor() {
    super('TransactionNotFoundError', 'Transação não encontrada.')
  }
}
