import { BaseError } from '@/domain/helpers'
import { Either } from '@shared/utils'

export namespace IGeneratePostUseCase {
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

export interface IGeneratePostUseCase {
  generatePost: (
    input: IGeneratePostUseCase.Input,
  ) => Promise<Either<BaseError, IGeneratePostUseCase.Output>>
}
