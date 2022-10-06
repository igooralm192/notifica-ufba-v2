import {
  ICountDisciplineRepository,
  IDisciplineRepositoryListInput,
  IFindAllDisciplineRepository,
} from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'
import { Prisma } from '@prisma/client'

export class PrismaDisciplineRepository
  extends PrismaRepository
  implements ICountDisciplineRepository, IFindAllDisciplineRepository
{
  async count(
    input: ICountDisciplineRepository.Input = {},
  ): Promise<ICountDisciplineRepository.Output> {
    const { take, skip } = input

    return this.client.discipline.count({ take, skip, where: this.parseWhereInput(input.where) })
  }

  async findAll(
    input: IFindAllDisciplineRepository.Input = {},
  ): Promise<IFindAllDisciplineRepository.Output> {
    const { take, skip, include } = input

    const disciplines = await this.client.discipline.findMany({
      take,
      skip: skip * take,
      include,
      where: this.parseWhereInput(input.where),
    })

    return disciplines
  }

  private parseWhereInput(where: IDisciplineRepositoryListInput['where']): Prisma.DisciplineWhereInput {
    return {
      code: {
        ...where.code,
        mode: 'insensitive',
      },
    }
  }
}
