import { BaseError } from '@/domain/helpers'

export class StudentAlreadyExistsError extends BaseError {
  constructor() {
    super('StudentAlreadyExistsError', 'Estudante já existe.')
  }
}
