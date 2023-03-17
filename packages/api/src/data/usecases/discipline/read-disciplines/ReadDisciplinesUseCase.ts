import { IReadDisciplinesUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, right } from '@shared/utils'

import {
  ICountDisciplineRepository,
  IFindAllDisciplineRepository,
} from '@/data/contracts'

export class ReadDisciplinesUseCase implements IReadDisciplinesUseCase {
  constructor(
    private readonly findAllDisciplineRepository: IFindAllDisciplineRepository,
    private readonly countDisciplineRepository: ICountDisciplineRepository,
  ) {}

  async run(
    input: IReadDisciplinesUseCase.Input = {},
  ): Promise<Either<BaseError, IReadDisciplinesUseCase.Output>> {
    const { filter, paginate } = input

    const [results, total] = await Promise.all([
      this.findAllDisciplineRepository.findAll({
        skip: paginate?.page,
        take: paginate?.limit,
        include: {
          groups: {
            include: {
              teacher: { include: { user: true } },
            },
          },
        },
        where: {
          code: filter.code,
          groups: filter.groups,
        },
      }),
      this.countDisciplineRepository.count({
        where: {
          code: filter.code,
          groups: filter.groups,
        },
      }),
    ])

    return right({ results, total })
  }
}
