import { Either, left, right } from '@shared/utils'
import {
  DisciplineGroupDoesNotExistError,
  StudentIsNotSubscribedError,
  StudentDoesNotExistError,
} from '@/domain/errors'
import { IUnsubscribeStudentUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'

import {
  IFindOneDisciplineGroupRepository,
  IFindOneStudentRepository,
  IRemoveStudentDisciplineGroupRepository,
} from '@/data/contracts'

export class UnsubscribeStudentUseCase implements IUnsubscribeStudentUseCase {
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly removeStudentDisciplineGroupRepository: IRemoveStudentDisciplineGroupRepository,
  ) {}

  async unsubscribe({
    context,
    params,
  }: IUnsubscribeStudentUseCase.Input): Promise<
    Either<BaseError, IUnsubscribeStudentUseCase.Output>
  > {
    const { studentId } = context
    const { disciplineGroupId } = params

    const student = await this.findOneStudentRepository.findOne({
      id: studentId,
    })

    if (!student) {
      return left(new StudentDoesNotExistError())
    }

    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: disciplineGroupId },
        include: { teacher: { include: { user: true } }, discipline: true },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    if (!disciplineGroup.studentIds?.includes(student.id)) {
      return left(new StudentIsNotSubscribedError(student.id))
    }

    const updatedDisciplineGroup =
      await this.removeStudentDisciplineGroupRepository.removeStudent(
        disciplineGroupId,
        { studentId: student.id },
      )

    return right({ disciplineGroup: updatedDisciplineGroup })
  }
}
