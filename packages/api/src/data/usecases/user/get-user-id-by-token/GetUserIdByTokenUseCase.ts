import { IGetUserIdByTokenUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import { IDecodeTokenCryptography } from '@/data/contracts'

export class GetUserIdByTokenUseCase implements IGetUserIdByTokenUseCase {
  constructor(
    private readonly decodeTokenCryptography: IDecodeTokenCryptography,
  ) {}

  async run({
    token,
  }: IGetUserIdByTokenUseCase.Input): Promise<
    Either<BaseError, IGetUserIdByTokenUseCase.Output>
  > {
    const payloadOrError = await this.decodeTokenCryptography.decode<{
      id: string
    }>({ token })

    if (payloadOrError.isLeft()) {
      return left(payloadOrError.value)
    }

    const { id: userId } = payloadOrError.value

    return right({ userId })
  }
}
