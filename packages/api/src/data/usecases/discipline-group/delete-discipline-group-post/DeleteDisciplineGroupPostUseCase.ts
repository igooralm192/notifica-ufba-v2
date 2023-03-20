import { Either, left, right } from '@shared/utils'
import { BaseError } from '@/domain/helpers'
import { IDeleteDisciplineGroupPostUseCase } from '@/domain/usecases'
import {
  IDisciplineGroupPostRepository,
  IFindOneDisciplineGroupRepository,
} from '@/data/contracts'
import {
  DisciplineGroupDoesNotExistError,
  DisciplineGroupPostDoesNotExistError,
  PostDoesNotBelongToThisGroupError,
} from '@/domain/errors'

export class DeleteDisciplineGroupPostUseCase
  implements IDeleteDisciplineGroupPostUseCase
{
  constructor(
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly findOneDisciplineGroupPostRepository: IDisciplineGroupPostRepository.FindOne,
    private readonly deleteDisciplineGroupPostRepository: IDisciplineGroupPostRepository.DeleteOne,
  ) {}

  async delete(
    params: IDeleteDisciplineGroupPostUseCase.Params,
  ): Promise<Either<BaseError, IDeleteDisciplineGroupPostUseCase.Output>> {
    const { disciplineGroupId, disciplineGroupPostId } = params

    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: disciplineGroupId },
        include: { discipline: true },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    const disciplineGroupPost =
      await this.findOneDisciplineGroupPostRepository.findOne({
        where: { id: disciplineGroupPostId },
      })

    if (!disciplineGroupPost) {
      return left(new DisciplineGroupPostDoesNotExistError())
    }

    if (disciplineGroup.id !== disciplineGroupPost.disciplineGroupId) {
      return left(
        new PostDoesNotBelongToThisGroupError(
          disciplineGroupId,
          disciplineGroupPostId,
        ),
      )
    }

    await this.deleteDisciplineGroupPostRepository.deleteOne({
      where: { id: disciplineGroupPostId },
    })

    return right(undefined)
  }
}
