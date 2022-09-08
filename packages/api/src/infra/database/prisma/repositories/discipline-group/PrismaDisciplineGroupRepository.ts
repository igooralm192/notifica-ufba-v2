import { IDisciplineGroup } from '@shared/entities'
import {
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
    IFindAllDisciplineGroupRepository,
    IFindOneDisciplineGroupRepository,
    IPushStudentDisciplineGroupRepository
{
  async findAll({
    take,
    skip,
    where,
    include,
    orderBy,
  }: IDisciplineGroupRepositoryListInput): Promise<IFindAllDisciplineGroupRepository.Output> {
    const disciplineGroups = await this.client.disciplineGroup.findMany({
      take,
      skip,
      where,
      include,
      orderBy,
    })

    return {
      results: disciplineGroups.map(this.parseDisciplineGroup),
      total: disciplineGroups.length,
    }
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
