import { BaseError } from '@/domain/helpers'

export class StudentIsNotSubscribedError extends BaseError {
  constructor(studentId: string) {
    super('StudentIsNotSubscribedError', 'Estudante não está inscrito.', {
      key: 'studentId',
      value: studentId,
    })
  }
}
