import { Either, left, right } from '@shared/utils'

import { DisciplineGroupDoesNotExistError } from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import { IPostMessageUseCase, IGenerateMessageUseCase } from '@/domain/usecases'
import {
  IFindOneDisciplineGroupRepository,
  IUserRepository,
} from '@/data/contracts'

export class GenerateMessageUseCase implements IGenerateMessageUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly findOneDisciplineGroupRepository: IFindOneDisciplineGroupRepository,
    private readonly postMessage: IPostMessageUseCase,
  ) {}

  async generateMessage({
    context,
    params,
  }: IGenerateMessageUseCase.Input): Promise<
    Either<BaseError, IGenerateMessageUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({
      id: context.userId,
    })

    const teacherUser = await this.findOneUserRepository.findOne({
      email: 'fdurao@ufba.br',
    })

    const disciplineGroup = await this.findOneDisciplineGroupRepository.findOne(
      { where: { id: params.disciplineGroupId } },
    )

    if (!disciplineGroup) {
      return left(new DisciplineGroupDoesNotExistError())
    }

    setTimeout(() => {
      this.postMessage.run({
        userId: teacherUser.id,
        disciplineGroupId: disciplineGroup.id,
        message: `Esta mensagem foi gerada automaticamente por ${user?.name} para experimentar a funcionalidade de notificações do aplicativo.`,
        notificationParams: {
          receivedBy: [user],
        },
      })
    }, 20000)

    return right(undefined)
  }
}
