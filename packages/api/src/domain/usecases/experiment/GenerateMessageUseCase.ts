import { BaseError } from '@/domain/helpers'
import { Either } from '@shared/utils'

export namespace IGenerateMessageUseCase {
  export type Context = {
    userId: string
  }

  export type Params = {
    disciplineGroupId: string
  }

  export type Input = {
    context: Context
    params: Params
  }

  export type Output = void
}

export interface IGenerateMessageUseCase {
  generateMessage: (
    input: IGenerateMessageUseCase.Input,
  ) => Promise<Either<BaseError, IGenerateMessageUseCase.Output>>
}
