import {
  DisciplineGroupDoesNotExistError,
  TeacherDoesNotExistError,
  UserDoesNotExistError,
} from '@/domain/errors'
import {
  ICreateNotificationUseCase,
  IPostMessageUseCase,
} from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import {
  ICreateDisciplineGroupMessageRepository,
  IFindAllStudentRepository,
  IFindOneDisciplineGroupRepository,
  ITeacherRepository,
  IUserRepository,
} from '@/data/contracts'

export class PostMessageUseCase implements IPostMessageUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly findOneTeacherRepository: ITeacherRepository.FindOne,
    private readonly findAllStudentRepository: IFindAllStudentRepository,
    private readonly createDisciplineGroupMessageRepository: ICreateDisciplineGroupMessageRepository,
    private readonly createNotificationUseCase: ICreateNotificationUseCase,
  ) {}

  async run({
    userId,
    disciplineGroupId,
    message,
    notificationParams,
    onlyNotify = false,
  }: IPostMessageUseCase.Input): Promise<Either<BaseError, void>> {
    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      {
        where: { id: disciplineGroupId },
        include: { discipline: true },
      },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    const teacher = await this.findOneTeacherRepository.findOne({
      where: { id: disciplineGroup.teacherId },
    })

    if (!teacher) {
      return left(new TeacherDoesNotExistError())
    }

    const allStudents = await this.findAllStudentRepository.findAll({
      where: { id: { in: disciplineGroup.studentIds } },
      include: { user: true },
    })

    if (!onlyNotify)
      await this.createDisciplineGroupMessageRepository.create({
        body: message,
        sentBy: user.name,
        sentById: user.id,
        disciplineGroupId,
      })

    // TODO: Add event
    this.createNotificationUseCase.create({
      params: { userId },
      body: {
        type: 'createMessage',
        params: {
          disciplineGroup,
          message,
          sentBy: user,
          receivedBy: notificationParams?.receivedBy || [
            teacher.user,
            ...allStudents.map(s => s.user),
          ],
        },
      },
    })

    return right(undefined)
  }
}
