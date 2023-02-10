import { ReadUserPictureUrlController } from '@/application/controllers/user'
import { makeReadUserPictureUrlUseCase } from '@/main/factories/usecases'

export const makeReadUserPictureUrlController = () => {
  const readUserPictureUrlUseCase = makeReadUserPictureUrlUseCase()

  return new ReadUserPictureUrlController(readUserPictureUrlUseCase)
}
