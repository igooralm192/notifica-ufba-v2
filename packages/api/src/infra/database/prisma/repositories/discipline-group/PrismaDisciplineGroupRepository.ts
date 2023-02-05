import { IDisciplineGroup } from '@shared/entities'
import { IQueryFilterDTO } from '@/domain/dtos'
import {
  ICountDisciplineGroupRepository,
  ICreateDisciplineGroupRepository,
  IDeleteDisciplineGroupRepository,
  IDisciplineGroupRepositoryListInput,
  IFindAllDisciplineGroupRepository,
  IFindOneDisciplineGroupRepository,
  IPushStudentDisciplineGroupRepository,
  IRemoveStudentDisciplineGroupRepository,
} from '@/data/contracts'
import { PrismaRepository } from '@/infra/database/prisma/helpers'

import { DisciplineGroup, Prisma } from '@prisma/client'

export class PrismaDisciplineGroupRepository
  extends PrismaRepository
  implements
    ICreateDisciplineGroupRepository,
    ICountDisciplineGroupRepository,
    IFindAllDisciplineGroupRepository,
    IFindOneDisciplineGroupRepository,
    IPushStudentDisciplineGroupRepository,
    IRemoveStudentDisciplineGroupRepository
{
  async create(
    { disciplineId, teacherId }: ICreateDisciplineGroupRepository.Params,
    {
      code,
      semester,
      description,
      menuUrl,
      place,
    }: ICreateDisciplineGroupRepository.Body,
  ): Promise<IDisciplineGroup> {
    const disciplineGroup = await this.client.disciplineGroup.create({
      data: {
        disciplineId,
        teacherId,
        code,
        semester,
        description,
        menuUrl,
        place,
      },
    })

    return this.parseDisciplineGroup(disciplineGroup)
  }

  async count({ where }: IDisciplineGroupRepositoryListInput): Promise<number> {
    return this.client.disciplineGroup.count({
      where: this.parseWhere(where),
    })
  }

  async findAll({
    take = 10,
    skip = 0,
    where,
    include,
    orderBy,
  }: IDisciplineGroupRepositoryListInput): Promise<IFindAllDisciplineGroupRepository.Output> {
    const disciplineGroups = await this.client.disciplineGroup.findMany({
      take,
      skip: skip * take,
      where: this.parseWhere(where),
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

  async removeStudent(
    disciplineGroupId: string,
    { studentId }: IRemoveStudentDisciplineGroupRepository.Input,
  ): Promise<IRemoveStudentDisciplineGroupRepository.Output> {
    const { studentIds } = await this.client.disciplineGroup.findFirst({
      select: { studentIds: true },
      where: { id: disciplineGroupId },
    })

    const disciplineGroup = await this.client.disciplineGroup.update({
      data: {
        studentIds: { set: studentIds.filter(id => id != studentId) },
      },
      where: { id: disciplineGroupId },
    })

    return this.parseDisciplineGroup(disciplineGroup)
  }

  async delete({
    where,
  }: IDeleteDisciplineGroupRepository.Input): Promise<void> {
    await this.client.disciplineGroup
      .delete({ where: { id: where.id } })
      .catch(() => null)
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

  private parseWhere(
    query: IQueryFilterDTO<IDisciplineGroup>,
  ): Prisma.DisciplineGroupWhereInput {
    return {
      OR: query.OR ? query.OR?.map(qf => this.parseWhere(qf)) : undefined,
      discipline: query.discipline
        ? {
            code: query.discipline?.code
              ? {
                  mode: 'insensitive',
                  equals: query.discipline?.code?.equals,
                  contains: query.discipline?.code?.contains,
                }
              : undefined,
            name: query.discipline?.name
              ? {
                  mode: 'insensitive',
                  equals: query.discipline?.name?.equals,
                  contains: query.discipline?.name?.contains,
                }
              : undefined,
          }
        : undefined,
      studentIds: query.studentIds
        ? { hasEvery: query.studentIds?.in ?? [] }
        : undefined,
      teacherId: query.teacherId
        ? { equals: query.teacherId?.equals }
        : undefined,
    }
  }
}
