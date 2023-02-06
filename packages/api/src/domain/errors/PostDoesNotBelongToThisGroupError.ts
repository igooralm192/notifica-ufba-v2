import { BaseError } from '@/domain/helpers'

export class PostDoesNotBelongToThisGroupError extends BaseError {
  constructor(disciplineGroupId: string, disciplineGroupPostId: string) {
    super(
      'PostDoesNotBelongToThisGroupError',
      'Postagem não pertence a esta turma.',
      [
        {
          key: 'disciplineGroupId',
          value: disciplineGroupId,
        },
        {
          key: 'disciplineGroupPostId',
          value: disciplineGroupPostId,
        },
      ],
    )
  }
}
