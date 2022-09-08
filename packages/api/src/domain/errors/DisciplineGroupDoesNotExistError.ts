import { BaseError } from '@/domain/helpers'

export class DisciplineGroupDoesNotExistError extends BaseError {
  constructor() {
    super('DisciplineGroupDoesNotExistError', 'Turma não encontrada.')
  }
}
