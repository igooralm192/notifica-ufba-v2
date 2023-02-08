import { IGetUserByIdUseCase } from '@/domain/usecases'
import { GetUserByIdUseCase } from '@/data/usecases/user'
import { makeUserRepository } from '@/main/factories/repositories'
import { makeStorageService } from '@/main/factories/services'

export const makeGetUserByIdUseCase = (): IGetUserByIdUseCase => {
  const userRepository = makeUserRepository()
  const storageService = makeStorageService()

  return new GetUserByIdUseCase(userRepository, storageService)
}
