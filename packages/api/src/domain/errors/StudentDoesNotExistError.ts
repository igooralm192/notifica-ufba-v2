import { BaseError } from '@/domain/helpers'

export class StudentDoesNotExistError extends BaseError {
  constructor() {
    super('StudentDoesNotExistError', 'Estudante não encontrado.')
  }
}
