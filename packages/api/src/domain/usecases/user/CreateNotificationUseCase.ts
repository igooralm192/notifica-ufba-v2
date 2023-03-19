import { IDisciplineGroup, IUser } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either } from '@shared/utils'

export interface ICreatePostNotificationParams {
  disciplineGroup: IDisciplineGroup
  content: string
  sentBy: IUser
  receivedBy: IUser[]
}

export interface ICreateMessageNotificationParams {
  disciplineGroup: IDisciplineGroup
  message: string
  sentBy: IUser
  receivedBy: IUser[]
}

export interface IRemoveMemberNotificationParams {
  disciplineGroup: IDisciplineGroup
  member: IUser
}

export namespace ICreateNotificationUseCase {
  export type Params = {
    userId: string
  }

  export type Body =
    | {
        type: 'createPost'
        params: ICreatePostNotificationParams
      }
    | {
        type: 'createMessage'
        params: ICreateMessageNotificationParams
      }
    | {
        type: 'removeMember'
        params: IRemoveMemberNotificationParams
      }

  export type Input = {
    params: Params
    body: Body
  }

  export type Output = {
    sent: boolean
  }
}

export interface ICreateNotificationUseCase {
  create: (
    input: ICreateNotificationUseCase.Input,
  ) => Promise<Either<BaseError, ICreateNotificationUseCase.Output>>
}
