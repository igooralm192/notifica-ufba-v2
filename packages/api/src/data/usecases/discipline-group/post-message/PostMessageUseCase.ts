import {
  DisciplineGroupDoesNotExistError,
  UserDoesNotExistError,
} from '@/domain/errors'
import { IPostMessageUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import {
  ICreateDisciplineGroupMessageRepository,
  ICreateMessagingService,
  IFindAllStudentRepository,
  IFindOneDisciplineGroupRepository,
  IUserRepository,
} from '@/data/contracts'

export class PostMessageUseCase implements IPostMessageUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly findAllStudentRepository: IFindAllStudentRepository,
    private readonly createDisciplineGroupMessageRepository: ICreateDisciplineGroupMessageRepository,
    private readonly createMessagingService: ICreateMessagingService,
  ) {}

  async run({
    userId,
    disciplineGroupId,
    message,
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

    const allStudents = await this.findAllStudentRepository.findAll({
      where: { id: { in: disciplineGroup.studentIds } },
      include: { user: true },
    })

    const allUserIds = allStudents
      .filter(({ user }) => user.id != userId)
      .map(({ userId }) => userId)

    if (!onlyNotify)
      await this.createDisciplineGroupMessageRepository.create({
        body: message,
        sentBy: user.name,
        sentById: user.id,
        disciplineGroupId,
      })

    // TODO: Add event
    this.createMessagingService.create({
      title: `${disciplineGroup.discipline?.code} - ${disciplineGroup.code}`,
      body: message,
      data: {
        type: 'message',
        disciplineGroupId: disciplineGroup.id,
        disciplineGroupCode: disciplineGroup.code,
        disciplineCode: disciplineGroup.discipline?.code,
        disciplineName: disciplineGroup.discipline?.name,
      },
      tokens: allUserIds,
    })

    return right(undefined)
  }
}
