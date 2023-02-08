import { BaseError } from '@/domain/helpers'
import { Either } from '@shared/utils'

export namespace IUpdateUserPictureUseCase {
  export type Params = {
    userId: string
  }

  export type Body = {
    file: {
      originalName: string
      buffer: Buffer
    }
  }

  export type Output = {
    url: string
  }
}

export interface IUpdateUserPictureUseCase {
  update: (
    params: IUpdateUserPictureUseCase.Params,
    body: IUpdateUserPictureUseCase.Body,
  ) => Promise<Either<BaseError, IUpdateUserPictureUseCase.Output>>
}
