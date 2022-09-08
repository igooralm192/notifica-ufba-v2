import { BaseError } from '@/domain/helpers'

export class StudentAlreadySubscribedError extends BaseError {
  constructor(studentId: string) {
    super('StudentAlreadySubscribedError', 'Estudante já inscrito.', {
      key: 'studentId',
      value: studentId,
    })
  }
}
