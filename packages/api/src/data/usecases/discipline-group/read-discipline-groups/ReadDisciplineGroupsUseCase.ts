import { IReadDisciplineGroupsUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, right } from '@shared/utils'

import {
  ICountDisciplineGroupRepository,
  IFindAllDisciplineGroupRepository,
} from '@/data/contracts'

export class ReadDisciplineGroupsUseCase implements IReadDisciplineGroupsUseCase {
  constructor(
    private readonly findAllDisciplineGroupRepository: IFindAllDisciplineGroupRepository,
    private readonly countDisciplineGroupRepository: ICountDisciplineGroupRepository,
  ) {}

  async run({
    where,
    paginate,
  }: IReadDisciplineGroupsUseCase.Input): Promise<
    Either<BaseError, IReadDisciplineGroupsUseCase.Output>
  > {
    const { studentIds, teacherId, OR } = where

    const [results, total] = await Promise.all([
      this.findAllDisciplineGroupRepository.findAll({
        where: { studentIds, teacherId, OR },
        skip: paginate?.page,
        take: paginate?.limit,
        include: {
          discipline: true,
          teacher: { include: { user: true } },
        },
      }),
      this.countDisciplineGroupRepository.count({
        where: { studentIds, teacherId },
      }),
    ])

    return right({ results, total })
  }
}
