import { GetMyUserController } from '@/application/controllers/user'
import { makeGetUserByIdUseCase } from '@/main/factories/usecases'

export const makeGetMyUserController = () => {
  const getUserByIdUseCase = makeGetUserByIdUseCase()

  return new GetMyUserController(getUserByIdUseCase)
}
