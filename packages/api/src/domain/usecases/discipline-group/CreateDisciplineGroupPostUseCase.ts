import { IDisciplineGroupPost, IUser } from '@shared/entities'
import { BaseError } from '@/domain/helpers'
import { Either, UseCase } from '@shared/utils'

export namespace ICreateDisciplineGroupPostUseCase {
  export type Input = {
    userId: string
    disciplineGroupId: string
    title?: string
    content: string
    notificationParams?: {
      receivedBy?: IUser[]
    }
  }

  export type Output = IDisciplineGroupPost
}

export type ICreateDisciplineGroupPostUseCase = UseCase<
  ICreateDisciplineGroupPostUseCase.Input,
  Either<BaseError, ICreateDisciplineGroupPostUseCase.Output>
>
