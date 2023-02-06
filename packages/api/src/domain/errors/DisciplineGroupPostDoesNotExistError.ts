import { BaseError } from '@/domain/helpers'

export class DisciplineGroupPostDoesNotExistError extends BaseError {
  constructor() {
    super('DisciplineGroupPostDoesNotExistError', 'Postagem não encontrada.')
  }
}
