import { Either, left, right } from '@shared/utils'

import { UserDoesNotExistError } from '@/domain/errors'
import { BaseError } from '@/domain/helpers'
import {
  ICreateMessageNotificationParams,
  ICreateNotificationUseCase,
  ICreatePostNotificationParams,
  IRemoveMemberNotificationParams,
} from '@/domain/usecases'

import { ICreateMessagingService, IUserRepository } from '@/data/contracts'

export class CreateNotificationUseCase implements ICreateNotificationUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly createMessagingService: ICreateMessagingService,
  ) {}

  async create({
    params: { userId },
    body,
  }: ICreateNotificationUseCase.Input): Promise<
    Either<BaseError, ICreateNotificationUseCase.Output>
  > {
    const user = await this.findOneUserRepository.findOne({ id: userId })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const { type, params } = body

    try {
      switch (type) {
        case 'createMessage':
          return this.sendCreateMessageNotification(params)
        case 'createPost':
          return this.sendCreatePostNotification(params)
        case 'removeMember':
          return this.sendRemoveMemberNotification(params)
      }
    } catch {
      return right({ sent: false })
    }
  }

  private async sendCreatePostNotification({
    disciplineGroup,
    content,
    sentBy,
    receivedBy,
  }: ICreatePostNotificationParams): Promise<
    Either<BaseError, ICreateNotificationUseCase.Output>
  > {
    const allUserPushTokens = receivedBy
      .filter(({ id, pushToken }) => id != sentBy.id && !!pushToken === true)
      .map(({ pushToken }) => pushToken)

    await this.createMessagingService.create({
      title: `${disciplineGroup.discipline?.code}/${disciplineGroup.code} - Nova postagem`,
      body: content,
      data: {
        type: 'createPost',
        params: {
          disciplineGroupId: disciplineGroup.id,
          disciplineGroupCode: disciplineGroup.code,
          disciplineCode: disciplineGroup.discipline?.code,
          disciplineName: disciplineGroup.discipline?.name,
        },
      },
      tokens: allUserPushTokens,
    })

    return right({ sent: true })
  }

  private async sendCreateMessageNotification({
    disciplineGroup,
    message,
    sentBy,
    receivedBy,
  }: ICreateMessageNotificationParams): Promise<
    Either<BaseError, ICreateNotificationUseCase.Output>
  > {
    const allUserPushTokens = receivedBy
      .filter(({ id, pushToken }) => id != sentBy.id && !!pushToken === true)
      .map(({ pushToken }) => pushToken)

    await this.createMessagingService.create({
      title: `${disciplineGroup.discipline?.code}/${disciplineGroup.code} - Nova mensagem`,
      body: message.slice(0, 100),
      data: {
        type: 'createMessage',
        params: {
          disciplineGroupId: disciplineGroup.id,
          disciplineGroupCode: disciplineGroup.code,
          disciplineCode: disciplineGroup.discipline?.code,
          disciplineName: disciplineGroup.discipline?.name,
        },
      },
      tokens: allUserPushTokens,
    })

    return right({ sent: true })
  }

  private async sendRemoveMemberNotification({
    disciplineGroup,
    member,
  }: IRemoveMemberNotificationParams): Promise<
    Either<BaseError, ICreateNotificationUseCase.Output>
  > {
    await this.createMessagingService.create({
      title: `${disciplineGroup.discipline?.code}/${disciplineGroup.code}`,
      body: 'Você foi removido desta turma pelo seu professor!',
      data: {
        type: 'removeMember',
        params: { disciplineGroupId: disciplineGroup.id },
      },
      tokens: [member.pushToken],
    })

    return right({ sent: true })
  }
}
