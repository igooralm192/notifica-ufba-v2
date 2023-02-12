import { Either, left } from '@shared/utils'
import {
  DisciplineGroupDoesNotExistError,
  StudentDoesNotExistError,
  TeacherDoesNotBelongToThisGroupError,
  TeacherDoesNotExistError,
} from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import {
  IRemoveDisciplineGroupStudentUseCase,
  IUnsubscribeStudentUseCase,
} from '@/domain/usecases'
import {
  ICreateMessagingService,
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
    private readonly createMessagingService: ICreateMessagingService,
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

    this.createMessagingService.create({
      title: `${disciplineGroup.discipline?.code} - ${disciplineGroup.code}`,
      body: 'Você foi removido desta turma pelo seu professor!',
      tokens: [student.user.pushToken],
    })

    return unsubscribeResult
  }
}
