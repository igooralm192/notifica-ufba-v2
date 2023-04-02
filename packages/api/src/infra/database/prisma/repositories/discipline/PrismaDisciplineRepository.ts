import {
  ICountDisciplineRepository,
  IDisciplineRepositoryListInput,
  IFindAllDisciplineRepository,
  IFindOneDisciplineRepository,
} from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'
import { Prisma } from '@prisma/client'
import { pick } from 'lodash'

export class PrismaDisciplineRepository
  extends PrismaRepository
  implements
    ICountDisciplineRepository,
    IFindAllDisciplineRepository,
    IFindOneDisciplineRepository
{
  async findOne({
    where,
    include,
  }: IFindOneDisciplineRepository.Input): Promise<IFindOneDisciplineRepository.Output> {
    const discipline = await this.client.discipline
      .findFirst({ where, include })
      .catch(() => null)

    if (!discipline) return null

    return discipline
  }

  async count(
    input: ICountDisciplineRepository.Input = {},
  ): Promise<ICountDisciplineRepository.Output> {
    const { take, skip } = input

    return this.client.discipline.count({
      take,
      skip,
      where: this.parseWhereInput(input.where),
    })
  }

  async findAll(
    input: IFindAllDisciplineRepository.Input = {},
  ): Promise<IFindAllDisciplineRepository.Output> {
    const { take, skip, include } = input

    const disciplines = await this.client.discipline.findMany({
      take,
      skip: skip * take,
      include: {
        groups:
          typeof include.groups === 'object'
            ? {
                include: include.groups.include,
                // where: pick(include.groups.where, 'teacherId'),
              }
            : false,
      },
      where: this.parseWhereInput(input.where),
    })

    return disciplines
  }

  private parseWhereInput(
    where: IDisciplineRepositoryListInput['where'],
  ): Prisma.DisciplineWhereInput {
    return {
      code: where.code
        ? {
            ...where.code,
            mode: 'insensitive',
          }
        : undefined,
      groups: where.groups
        ? { some: pick(where.groups, 'teacherId') }
        : undefined,
    }
  }
}
