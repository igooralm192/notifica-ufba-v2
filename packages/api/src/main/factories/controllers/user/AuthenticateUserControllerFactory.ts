import { AuthenticateUserController } from '@/application/controllers/user'
import { makeAuthenticateUserUseCase } from '@/main/factories/usecases'
import { makeAuthenticateUserValidation } from '@/main/factories/validation'

export const makeAuthenticateUserController = () => {
  const authenticateUserValidation = makeAuthenticateUserValidation()
  const authenticateUserUseCase = makeAuthenticateUserUseCase()

  return new AuthenticateUserController(
    authenticateUserValidation,
    authenticateUserUseCase,
  )
}
