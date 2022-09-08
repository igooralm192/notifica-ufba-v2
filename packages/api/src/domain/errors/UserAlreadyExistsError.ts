import { BaseError } from '@/domain/helpers'

export class UserAlreadyExistsError extends BaseError {
  constructor() {
    super('UserAlreadyExistsError', 'Usuário já existe.')
  }
}
