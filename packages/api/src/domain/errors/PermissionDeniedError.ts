import { BaseError } from '@/domain/helpers'

export class PermissionDeniedError extends BaseError {
  constructor() {
    super('PermissionDeniedError', 'Não possui permissão para realizar esta operação.')
  }
}
