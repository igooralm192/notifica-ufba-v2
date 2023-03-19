import { Either, left, right } from '@shared/utils'

import {
  DisciplineGroupDoesNotExistError,
  UserDoesNotExistError,
} from '@/domain/errors'
import {
  ICreateDisciplineGroupPostUseCase,
  ICreateNotificationUseCase,
} from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'

import {
  IFindAllStudentRepository,
  IFindOneDisciplineGroupRepository,
  IDisciplineGroupPostRepository,
  IUserRepository,
} from '@/data/contracts'

export class CreateDisciplineGroupPostUseCase
  implements ICreateDisciplineGroupPostUseCase
{
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly findAllStudentRepository: IFindAllStudentRepository,
    private readonly createDisciplineGroupPostRepository: IDisciplineGroupPostRepository.Create,
    private readonly createNotificationUseCase: ICreateNotificationUseCase,
  ) {}

  async run({
    userId,
    disciplineGroupId,
    title,
    content,
  }: ICreateDisciplineGroupPostUseCase.Input): Promise<
    Either<BaseError, ICreateDisciplineGroupPostUseCase.Output>
  > {
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

    const disciplineGroupPost =
      await this.createDisciplineGroupPostRepository.create({
        title,
        content,
        authorId: user.id,
        disciplineGroupId,
      })

    // TODO: Isolate to usecase

    const allStudents = await this.findAllStudentRepository.findAll({
      where: { id: { in: disciplineGroup.studentIds } },
      include: { user: true },
    })

    this.createNotificationUseCase.create({
      params: { userId },
      body: {
        type: 'createPost',
        params: {
          disciplineGroup,
          content,
          sentBy: user,
          receivedBy: allStudents.map(s => s.user),
        },
      },
    })

    return right(disciplineGroupPost)
  }
}
