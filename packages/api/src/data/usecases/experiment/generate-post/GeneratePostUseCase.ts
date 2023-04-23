import { Either, left, right } from '@shared/utils'

import { DisciplineGroupDoesNotExistError } from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import {
  ICreateDisciplineGroupPostUseCase,
  IGeneratePostUseCase,
} from '@/domain/usecases'
import {
  IFindOneDisciplineGroupRepository,
  IUserRepository,
} from '@/data/contracts'

export class GeneratePostUseCase implements IGeneratePostUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly createDisciplineGroupPostUseCase: ICreateDisciplineGroupPostUseCase,
  ) {}

  async generatePost({
    context,
  }: IGeneratePostUseCase.Input): Promise<
    Either<BaseError, IGeneratePostUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({
      id: context.userId,
    })

    const teacherUser = await this.findOneUserRepository.findOne({
      email: 'fdurao@ufba.br',
    })

    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      { where: { id: '642b2053e2baeceac4a802a6' } }, // IC0029
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    setTimeout(() => {
      this.createDisciplineGroupPostUseCase.run({
        userId: teacherUser.id,
        disciplineGroupId: disciplineGroup.id,
        content: `Esta postagem foi gerada automaticamente por ${user?.name} para experimentar a funcionalidade de notificações do aplicativo.`,
        notificationParams: { receivedBy: [user] },
      })
    }, 20000)

    return right(undefined)
  }
}
