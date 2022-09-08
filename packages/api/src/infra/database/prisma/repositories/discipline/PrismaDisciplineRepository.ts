import {
  ICountDisciplineRepository,
  IFindAllDisciplineRepository,
} from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

export class PrismaDisciplineRepository
  extends PrismaRepository
  implements ICountDisciplineRepository, IFindAllDisciplineRepository
{
  async count(
    input: ICountDisciplineRepository.Input = {},
  ): Promise<ICountDisciplineRepository.Output> {
    const { take, skip } = input

    return await this.client.discipline.count({ take, skip })
  }

  async findAll(
    input: IFindAllDisciplineRepository.Input = {},
  ): Promise<IFindAllDisciplineRepository.Output> {
    const { take, skip, include } = input

    const disciplines = await this.client.discipline.findMany({
      take,
      skip,
      include,
    })

    return disciplines
  }
}
