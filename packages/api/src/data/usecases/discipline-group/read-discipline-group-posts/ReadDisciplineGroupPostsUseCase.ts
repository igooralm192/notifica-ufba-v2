import { DisciplineGroupDoesNotExistError } from '@/domain/errors'
import { IReadDisciplineGroupPostsUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import {
  IDisciplineGroupPostRepository,
  IFindOneDisciplineGroupRepository,
} from '@/data/contracts'

export class ReadDisciplineGroupPostsUseCase
  implements IReadDisciplineGroupPostsUseCase
{
  constructor(
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly findAllDisciplineGroupPostRepository: IDisciplineGroupPostRepository.FindAll,
    private readonly countDisciplineGroupPostRepository: IDisciplineGroupPostRepository.Count,
  ) {}

  async run({
    disciplineGroupId,
    listInput: { paginate },
  }: IReadDisciplineGroupPostsUseCase.Input): Promise<
    Either<BaseError, IReadDisciplineGroupPostsUseCase.Output>
  > {
    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: disciplineGroupId },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    const [results, total] = await Promise.all([
      this.findAllDisciplineGroupPostRepository.findAll({
        take: paginate?.limit,
        skip: paginate?.page,
        where: { disciplineGroupId },
        orderBy: { createdAt: 'desc' },
        include: { author: true },
      }),
      this.countDisciplineGroupPostRepository.count({
        where: { disciplineGroupId },
      }),
    ])

    return right({ results, total })
  }
}
