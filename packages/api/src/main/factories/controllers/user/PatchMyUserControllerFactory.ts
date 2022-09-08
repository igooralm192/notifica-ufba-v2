import { PatchMyUserController } from '@/application/controllers/user'
import { makeUpdateUserUseCase } from '@/main/factories/usecases'
import { makePatchMyUserValidation } from '@/main/factories/validation'

export const makePatchMyUserController = () => {
  const validation = makePatchMyUserValidation()
  const updateUserUseCase = makeUpdateUserUseCase()

  return new PatchMyUserController(validation, updateUserUseCase)
}
