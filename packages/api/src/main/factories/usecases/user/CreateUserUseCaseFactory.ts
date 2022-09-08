import { CreateUserUseCase } from '@/data/usecases/user'
import { makeHashCryptography } from '@/main/factories/cryptography'
import { makeUserRepository } from '@/main/factories/repositories'

export const makeCreateUserUseCase = () => {
  const userRepository = makeUserRepository()
  const hashCryptography = makeHashCryptography()

  return new CreateUserUseCase(userRepository, hashCryptography, userRepository)
}
