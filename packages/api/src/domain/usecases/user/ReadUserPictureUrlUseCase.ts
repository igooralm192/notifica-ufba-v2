import { BaseError } from '@/domain/helpers'
import { Either } from '@shared/utils'

export namespace IReadUserPictureUrlUseCase {
  export type Params = {
    userId: string
  }

  export type Output = {
    url: string | null
  }
}

export interface IReadUserPictureUrlUseCase {
  readPictureUrl: (
    params: IReadUserPictureUrlUseCase.Params,
  ) => Promise<Either<BaseError, IReadUserPictureUrlUseCase.Output>>
}
