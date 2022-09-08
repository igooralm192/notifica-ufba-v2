import { AuthenticateUserUseCase } from '@/data/usecases/user'
import {
  makeHashCryptography,
  makeTokenCryptography,
} from '@/main/factories/cryptography'
import { makeUserRepository } from '@/main/factories/repositories'

export const makeAuthenticateUserUseCase = () => {
  const userRepository = makeUserRepository()
  const hashCryptography = makeHashCryptography()
  const tokenCryptography = makeTokenCryptography()

  return new AuthenticateUserUseCase(
    userRepository,
    hashCryptography,
    tokenCryptography,
  )
}
