import { IReadDisciplineGroupsUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, right } from '@shared/utils'

import { IFindAllDisciplineGroupRepository } from '@/data/contracts'

export class ReadDisciplineGroupsUseCase
  implements IReadDisciplineGroupsUseCase
{
  constructor(
    private readonly findAllDisciplineGroupRepository: IFindAllDisciplineGroupRepository,
  ) {}

  async run({
    listInput: { filter, paginate },
  }: IReadDisciplineGroupsUseCase.Input): Promise<
    Either<BaseError, IReadDisciplineGroupsUseCase.Output>
  > {
    const disciplineGroups =
      await this.findAllDisciplineGroupRepository.findAll({
        where: filter,
        skip: paginate?.page,
        take: paginate?.limit,
        include: {
          discipline: true,
          teacher: { include: { user: true } },
        },
      })
    
    console.log({disciplineGroups})

    return right({
      results: disciplineGroups.results,
      total: disciplineGroups.total,
    })
  }
}
