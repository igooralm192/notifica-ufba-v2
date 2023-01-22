import { BaseError } from '@/domain/helpers'

export class DisciplineDoesNotExistError extends BaseError {
  constructor() {
    super('DisciplineDoesNotExistError', 'Disciplina não encontrada.')
  }
}
