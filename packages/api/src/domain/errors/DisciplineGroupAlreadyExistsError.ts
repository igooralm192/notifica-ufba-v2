import { BaseError } from '@/domain/helpers'

export class DisciplineGroupAlreadyExistsError extends BaseError {
  constructor() {
    super('DisciplineGroupAlreadyExistsError', 'Turma já existe.')
  }
}
