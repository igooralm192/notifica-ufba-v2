import { BaseError } from '@/domain/helpers'

export class UserDoesNotExistError extends BaseError {
  constructor() {
    super('UserDoesNotExistError', 'Usuário não encontrado.')
  }
}
