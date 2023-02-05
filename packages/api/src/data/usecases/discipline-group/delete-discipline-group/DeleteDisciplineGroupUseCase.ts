import { Either, left, right } from '@shared/utils'
import { BaseError } from '@/domain/helpers'
import { IDeleteDisciplineGroupUseCase } from '@/domain/usecases'
import {
  IDeleteDisciplineGroupRepository,
  IFindOneDisciplineGroupRepository,
} from '@/data/contracts'
import { DisciplineGroupDoesNotExistError } from '@/domain/errors'

export class DeleteDisciplineGroupUseCase
  implements IDeleteDisciplineGroupUseCase
{
  constructor(
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly deleteDisciplineGroupRepository: IDeleteDisciplineGroupRepository,
  ) {}

  async delete(
    params: IDeleteDisciplineGroupUseCase.Params,
  ): Promise<Either<BaseError, void>> {
    const { disciplineGroupId } = params

    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: disciplineGroupId },
        include: { discipline: true },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    await this.deleteDisciplineGroupRepository.delete({
      where: { id: disciplineGroup.id },
    })

    return right(undefined)
  }
}
