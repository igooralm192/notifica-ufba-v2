import { Either, left, right } from '@shared/utils'

import {
  DisciplineGroupDoesNotExistError,
  UserDoesNotExistError,
} from '@/domain/errors'
import { ICreateDisciplineGroupPostUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'

import {
  ICreateMessagingService,
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
    private readonly createMessagingService: ICreateMessagingService,
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

    const allUserPushTokens = allStudents
      .filter(({ user }) => user.id != userId && !!user.pushToken === true)
      .map(({ user }) => user!.pushToken)

    this.createMessagingService.create({
      title: `${disciplineGroup.discipline?.code} - ${disciplineGroup.code}`,
      body: 'Há uma nova postagem para esta turma!',
      data: {
        type: 'post',
        disciplineGroupId: disciplineGroup.id,
        disciplineGroupCode: disciplineGroup.code,
        disciplineCode: disciplineGroup.discipline?.code,
        disciplineName: disciplineGroup.discipline?.name,
      },
      tokens: allUserPushTokens,
    })

    return right(disciplineGroupPost)
  }
}
