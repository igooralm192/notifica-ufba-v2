import { IDisciplineGroupMemberDTO } from '@shared/dtos'
import { Either, left, right } from '@shared/utils'

import { BaseError } from '@/domain/helpers'
import { IReadDisciplineGroupMembersUseCase } from '@/domain/usecases'
import { DisciplineGroupDoesNotExistError } from '@/domain/errors'

import {
  IFindAllDisciplineGroupStudentsRepository,
  IFindAllDisciplineGroupTeachersRepository,
  IFindOneDisciplineGroupRepository,
} from '@/data/contracts'

export class ReadDisciplineGroupMembersUseCase
  implements IReadDisciplineGroupMembersUseCase
{
  constructor(
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly findAllDisciplineGroupStudentsRepository: IFindAllDisciplineGroupStudentsRepository,
    private readonly findAllDisciplineGroupTeachersRepository: IFindAllDisciplineGroupTeachersRepository,
  ) {}

  async readMembers({
    disciplineGroupId,
  }: IReadDisciplineGroupMembersUseCase.Params): Promise<
    Either<BaseError, IReadDisciplineGroupMembersUseCase.Output>
  > {
    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: disciplineGroupId },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    const allStudents =
      await this.findAllDisciplineGroupStudentsRepository.findAllStudents({
        where: { id: disciplineGroupId },
      })

    const allTeachers =
      await this.findAllDisciplineGroupTeachersRepository.findAllTeachers({
        where: { id: disciplineGroupId },
      })

    const studentUsers = allStudents.map(s => ({
      ...s.user!,
      student: { id: s.id },
    }))
    const teacherUsers = allTeachers.map(t => ({
      ...t.user!,
      teacher: { id: t.id },
    }))

    const members = [...studentUsers, ...teacherUsers].map(
      u =>
        ({
          userId: u.id,
          userName: u.name,
          userType: u.type,
          studentId: u.student?.id,
          teacherId: u.teacher?.id,
        } as IDisciplineGroupMemberDTO),
    )

    return right(members)
  }
}
