import { IDisciplineGroup } from '@shared/entities'
import {
  ICountDisciplineGroupRepository,
  IDisciplineGroupRepositoryListInput,
  IFindAllDisciplineGroupRepository,
  IFindOneDisciplineGroupRepository,
  IPushStudentDisciplineGroupRepository,
} from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

import { DisciplineGroup } from '@prisma/client'

export class PrismaDisciplineGroupRepository
  extends PrismaRepository
  implements
    ICountDisciplineGroupRepository,
    IFindAllDisciplineGroupRepository,
    IFindOneDisciplineGroupRepository,
    IPushStudentDisciplineGroupRepository
{
  async count({ where }: IDisciplineGroupRepositoryListInput): Promise<number> {
    return this.client.disciplineGroup.count({ where })
  }

  async findAll({
    take,
    skip,
    where,
    include,
    orderBy,
  }: IDisciplineGroupRepositoryListInput): Promise<IFindAllDisciplineGroupRepository.Output> {
    const disciplineGroups = await this.client.disciplineGroup.findMany({
      take,
      skip: skip * take,
      where,
      include,
      orderBy,
    })

    return disciplineGroups.map(this.parseDisciplineGroup)
  }

  async findOne({
    where,
    include,
  }: IFindOneDisciplineGroupRepository.Input): Promise<IFindOneDisciplineGroupRepository.Output> {
    const disciplineGroup = await this.client.disciplineGroup
      .findFirst({ where, include })
      .catch(() => null)

    if (!disciplineGroup) return null

    return this.parseDisciplineGroup(disciplineGroup)
  }

  async pushStudent(
    disciplineGroupId: string,
    { studentId }: IPushStudentDisciplineGroupRepository.Input,
  ): Promise<IPushStudentDisciplineGroupRepository.Output> {
    const disciplineGroup = await this.client.disciplineGroup.update({
      data: {
        studentIds: { push: studentId },
      },
      where: { id: disciplineGroupId },
    })

    return this.parseDisciplineGroup(disciplineGroup)
  }

  private parseDisciplineGroup(
    disciplineGroup: DisciplineGroup,
  ): IDisciplineGroup {
    return {
      ...disciplineGroup,
      teacherId: disciplineGroup.teacherId ?? undefined,
      disciplineId: disciplineGroup.disciplineId ?? undefined,
    }
  }
}
