import { IGetUserByIdUseCase } from '@/domain/usecases'
import { GetUserByIdUseCase } from '@/data/usecases/user'
import { makeUserRepository } from '@/main/factories/repositories'
import { makeReadUserPictureUrlUseCase } from '@/main/factories/usecases'

export const makeGetUserByIdUseCase = (): IGetUserByIdUseCase => {
  const userRepository = makeUserRepository()
  const readUserPictureUrlUseCase = makeReadUserPictureUrlUseCase()

  return new GetUserByIdUseCase(userRepository, readUserPictureUrlUseCase)
}
