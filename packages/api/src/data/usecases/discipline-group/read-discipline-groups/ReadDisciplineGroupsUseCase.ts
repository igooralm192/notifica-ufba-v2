import { IReadDisciplineGroupsUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, right } from '@shared/utils'

import {
  ICountDisciplineGroupRepository,
  IFindAllDisciplineGroupRepository,
} from '@/data/contracts'

export class ReadDisciplineGroupsUseCase
  implements IReadDisciplineGroupsUseCase
{
  constructor(
    private readonly findAllDisciplineGroupRepository: IFindAllDisciplineGroupRepository,
    private readonly countDisciplineGroupRepository: ICountDisciplineGroupRepository,
  ) {}

  async run({
    listInput: { filter, paginate },
  }: IReadDisciplineGroupsUseCase.Input): Promise<
    Either<BaseError, IReadDisciplineGroupsUseCase.Output>
  > {
    const [results, total] = await Promise.all([
      this.findAllDisciplineGroupRepository.findAll({
        where: filter,
        skip: paginate?.page,
        take: paginate?.limit,
        include: {
          discipline: true,
          teacher: { include: { user: true } },
        },
      }),
      this.countDisciplineGroupRepository.count({ where: filter }),
    ])

    return right({ results, total })
  }
}
