import { ReadUserPictureUrlUseCase } from '@/data/usecases/user'
import { makeUserRepository } from '@/main/factories/repositories'
import { makeStorageService } from '@/main/factories/services'

export const makeReadUserPictureUrlUseCase = () => {
  const userRepository = makeUserRepository()
  const storageService = makeStorageService()

  return new ReadUserPictureUrlUseCase(userRepository, storageService)
}
