import { BaseError } from '@/domain/helpers'

export class TeacherDoesNotBelongToThisGroupError extends BaseError {
  constructor(disciplineGroupId: string, teacherId: string) {
    super(
      'TeacherDoesNotBelongToThisGroupError',
      'Professor não pertence a esta turma.',
      [
        {
          key: 'disciplineGroupId',
          value: disciplineGroupId,
        },
        {
          key: 'teacherId',
          value: teacherId,
        },
      ],
    )
  }
}
