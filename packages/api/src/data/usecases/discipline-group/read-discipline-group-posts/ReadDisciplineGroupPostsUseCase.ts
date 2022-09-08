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
    private readonly findAllByDisciplineGroupIdDisciplineGroupPostRepository: IDisciplineGroupPostRepository.FindAllByDisciplineGroupId,
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

    const disciplineGroupPosts =
      await this.findAllByDisciplineGroupIdDisciplineGroupPostRepository.findAllByDisciplineGroupId(
        disciplineGroup.id,
        {
          take: paginate?.limit,
          skip: paginate?.page,
          orderBy: { createdAt: 'desc' },
          include: { author: true },
        },
      )

    return right({
      results: disciplineGroupPosts.results,
      total: disciplineGroupPosts.total,
    })
  }
}
