import { BaseError } from '@/domain/helpers'

export class TeacherDoesNotExistError extends BaseError {
  constructor() {
    super('TeacherDoesNotExistError', 'Professor não encontrado.')
  }
}
