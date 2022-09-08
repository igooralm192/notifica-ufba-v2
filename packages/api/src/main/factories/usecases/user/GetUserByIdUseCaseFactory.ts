import { IGetUserByIdUseCase } from '@/domain/usecases'
import { GetUserByIdUseCase } from '@/data/usecases/user'
import { makeUserRepository } from '@/main/factories/repositories'

export const makeGetUserByIdUseCase = (): IGetUserByIdUseCase => {
  const userRepository = makeUserRepository()

  return new GetUserByIdUseCase(userRepository)
}
