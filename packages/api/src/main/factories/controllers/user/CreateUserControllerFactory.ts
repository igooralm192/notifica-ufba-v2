import { CreateUserController } from '@/application/controllers/user'
import { makeCreateUserUseCase } from '@/main/factories/usecases'
import { makeCreateUserValidation } from '@/main/factories/validation'

export const makeCreateUserController = () => {
  const createUserValidation = makeCreateUserValidation()
  const createUserUseCase = makeCreateUserUseCase()

  return new CreateUserController(createUserValidation, createUserUseCase)
}
