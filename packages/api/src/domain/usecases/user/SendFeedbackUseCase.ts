import { BaseError } from '@/domain/helpers'
import { Either } from '@shared/utils'

export namespace ISendFeedbackUseCase {
  export type Body = {
    feedback: string
  }

  export type Input = {
    body: Body
  }

  export type Output = void
}

export interface ISendFeedbackUseCase {
  sendFeedback: (
    input: ISendFeedbackUseCase.Input,
  ) => Promise<Either<BaseError, ISendFeedbackUseCase.Output>>
}
