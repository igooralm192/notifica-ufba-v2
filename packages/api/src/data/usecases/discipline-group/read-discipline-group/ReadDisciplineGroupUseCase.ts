import { DisciplineGroupDoesNotExistError } from '@/domain/errors'
import { IReadDisciplineGroupUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import { IFindOneDisciplineGroupRepository } from '@/data/contracts'

export class ReadDisciplineGroupUseCase implements IReadDisciplineGroupUseCase {
  constructor(
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
  ) {}

  async run({
    id,
  }: IReadDisciplineGroupUseCase.Input): Promise<
    Either<BaseError, IReadDisciplineGroupUseCase.Output>
  > {
    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: id.disciplineGroupId },
        include: { discipline: true, teacher: { include: { user: true } } },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    return right({ disciplineGroup })
  }
}
