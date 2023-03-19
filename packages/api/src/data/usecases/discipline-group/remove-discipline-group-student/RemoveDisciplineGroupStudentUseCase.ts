import { Either, left } from '@shared/utils'
import {
  DisciplineGroupDoesNotExistError,
  StudentDoesNotExistError,
  TeacherDoesNotBelongToThisGroupError,
  TeacherDoesNotExistError,
} from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import {
  ICreateNotificationUseCase,
  IRemoveDisciplineGroupStudentUseCase,
  IUnsubscribeStudentUseCase,
} from '@/domain/usecases'
import {
  IFindOneDisciplineGroupRepository,
  IFindOneStudentRepository,
  ITeacherRepository,
} from '@/data/contracts'

export class RemoveDisciplineGroupStudentUseCase
  implements IRemoveDisciplineGroupStudentUseCase
{
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
    private readonly findOneTeacherRepository: ITeacherRepository.FindOne,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly unsubscribeStudentUseCase: IUnsubscribeStudentUseCase,
    private readonly createNotificationUseCase: ICreateNotificationUseCase,
  ) {}

  async removeStudent({
    context,
    params,
  }: IRemoveDisciplineGroupStudentUseCase.Input): Promise<
    Either<BaseError, IRemoveDisciplineGroupStudentUseCase.Output>
  > {
    const { teacherId } = context
    const { studentId, disciplineGroupId } = params

    // Find student
    const student = await this.findOneStudentRepository.findOne({
      id: studentId,
    })

    if (!student) {
      return left(new StudentDoesNotExistError())
    }

    // Find teacher
    const teacher = await this.findOneTeacherRepository.findOne({
      where: { id: teacherId },
    })

    if (!teacher) {
      return left(new TeacherDoesNotExistError())
    }

    // Find discipline group
    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: disciplineGroupId },
        include: { discipline: true },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    if (disciplineGroup.teacherId !== teacherId) {
      return left(
        new TeacherDoesNotBelongToThisGroupError(disciplineGroupId, teacherId),
      )
    }

    const unsubscribeResult = await this.unsubscribeStudentUseCase.unsubscribe({
      context: { studentId: student.id },
      params: { disciplineGroupId },
    })

    this.createNotificationUseCase.create({
      params: { userId: teacher.userId },
      body: {
        type: 'removeMember',
        params: { disciplineGroup, member: student.user },
      },
    })

    return unsubscribeResult
  }
}
