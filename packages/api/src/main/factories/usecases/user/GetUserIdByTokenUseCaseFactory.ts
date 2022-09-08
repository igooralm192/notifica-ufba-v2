import { IGetUserIdByTokenUseCase } from '@/domain/usecases'
import { GetUserIdByTokenUseCase } from '@/data/usecases/user'
import { makeTokenCryptography } from '@/main/factories/cryptography'

export const makeGetUserIdByTokenUseCase = (): IGetUserIdByTokenUseCase => {
  const tokenCryptography = makeTokenCryptography()

  return new GetUserIdByTokenUseCase(tokenCryptography)
}
