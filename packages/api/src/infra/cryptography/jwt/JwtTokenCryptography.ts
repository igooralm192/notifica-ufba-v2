import { left, right } from '@shared/utils'

import { ExpiredTokenError, InvalidTokenError } from '@/data/errors'
import {
  IGenerateTokenCryptography,
  IDecodeTokenCryptography,
} from '@/data/contracts'

import jwt from 'jsonwebtoken'

export class JwtTokenCryptography
  implements IGenerateTokenCryptography, IDecodeTokenCryptography
{
  constructor(
    private readonly SECRET_KEY = process.env.JWT_SECRET_KEY || 'MY_SECRET',
  ) {}

  private resolveDecodeTokenJwtError(
    error: any,
  ): IDecodeTokenCryptography.Errors {
    switch (error?.name as string) {
      case 'TokenExpiredError':
        return new ExpiredTokenError()
      default:
        return new InvalidTokenError()
    }
  }

  async generate(
    { payload }: IGenerateTokenCryptography.Input,
    { expiresIn }: IGenerateTokenCryptography.Options,
  ): Promise<IGenerateTokenCryptography.Output> {
    return jwt.sign(payload, this.SECRET_KEY, { expiresIn: expiresIn || '7d',  })
  }

  async decode<T = any>({
    token,
  }: IDecodeTokenCryptography.Input): Promise<IDecodeTokenCryptography.Output> {
    try {
      return right(jwt.verify(token, this.SECRET_KEY) as T)
    } catch (error) {
      return left(this.resolveDecodeTokenJwtError(error))
    }
  }
}
