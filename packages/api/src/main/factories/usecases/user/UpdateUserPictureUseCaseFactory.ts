import { UpdateUserPictureUseCase } from '@/data/usecases/user'
import { makeUserRepository } from '@/main/factories/repositories'
import { makeStorageService } from '@/main/factories/services'

export const makeUpdateUserPictureUseCase = () => {
  const userRepository = makeUserRepository()
  const storageService = makeStorageService()
  
  return new UpdateUserPictureUseCase(userRepository, storageService)
}
