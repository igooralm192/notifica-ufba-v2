import { BaseError } from '@/domain/helpers'

export class WrongPasswordError extends BaseError {
  constructor() {
    super('WrongPasswordError', 'Senha incorreta.')
  }
}
