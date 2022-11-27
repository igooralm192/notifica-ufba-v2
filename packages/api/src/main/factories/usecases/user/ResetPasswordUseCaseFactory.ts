import { ResetPasswordUseCase } from '@/data/usecases/user'
import { makeHashCryptography, makeTokenCryptography } from '@/main/factories/cryptography'
import { makeUserRepository } from '@/main/factories/repositories'

export const makeResetPasswordUseCase = () => {
  const tokenCryptography = makeTokenCryptography()
  const userRepository = makeUserRepository()
  const hashCryptography = makeHashCryptography()

  return new ResetPasswordUseCase(
    tokenCryptography,
    userRepository,
    hashCryptography,
    userRepository,
  )
}
