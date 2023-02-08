import { UpdateUserPictureController } from '@/application/controllers/user'
import { makeUpdateUserPictureUseCase } from '@/main/factories/usecases'
import { makeUpdateUserPictureValidation } from '@/main/factories/validation'

export const makeUpdateUserPictureController = () => {
  const updateUserPictureValidation = makeUpdateUserPictureValidation()
  const updateUserPictureUseCase = makeUpdateUserPictureUseCase()

  return new UpdateUserPictureController(
    updateUserPictureValidation,
    updateUserPictureUseCase,
  )
}
