import {
  DisciplineGroupDoesNotExistError,
  StudentAlreadySubscribedError,
  StudentDoesNotExistError,
} from '@/domain/errors'
import { ISubscribeStudentToDisciplineGroupUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import {
  IFindOneDisciplineGroupRepository,
  IFindOneStudentRepository,
  IPushStudentDisciplineGroupRepository,
} from '@/data/contracts'

export class SubscribeStudentToDisciplineGroupUseCase
  implements ISubscribeStudentToDisciplineGroupUseCase
{
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly pushStudentDisciplineGroupRepository: IPushStudentDisciplineGroupRepository,
  ) {}

  async run({
    userId,
    disciplineGroupId,
  }: ISubscribeStudentToDisciplineGroupUseCase.Input): Promise<
    Either<BaseError, ISubscribeStudentToDisciplineGroupUseCase.Output>
  > {
    const student = await this.findOneStudentRepository.findOne({ userId })

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

    if (disciplineGroup.studentIds?.includes(student.id)) {
      return left(new StudentAlreadySubscribedError(student.id))
    }

    const updatedDisciplineGroup =
      await this.pushStudentDisciplineGroupRepository.pushStudent(
        disciplineGroupId,
        { studentId: student.id },
      )

    return right({ disciplineGroup: updatedDisciplineGroup })
  }
}
