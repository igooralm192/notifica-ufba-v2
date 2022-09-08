import { Either } from '@shared/utils'

import { InvalidTokenError, ExpiredTokenError } from '@/data/errors'

export namespace IGenerateTokenCryptography {
  export type Input = {
    payload: any
  }

  export type Output = string
}

export interface IGenerateTokenCryptography {
  generate(
    input: IGenerateTokenCryptography.Input,
  ): Promise<IGenerateTokenCryptography.Output>
}

export namespace IDecodeTokenCryptography {
  export type Input = {
    token: string
  }

  export type Errors = InvalidTokenError | ExpiredTokenError

  export type Output<T = any> = Either<Errors, T>
}

export interface IDecodeTokenCryptography {
  decode<T = any>(
    input: IDecodeTokenCryptography.Input,
  ): Promise<IDecodeTokenCryptography.Output<T>>
}
