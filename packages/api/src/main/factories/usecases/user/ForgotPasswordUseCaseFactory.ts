import { ForgotPasswordUseCase } from '@/data/usecases/user'
import { makeTokenCryptography } from '@/main/factories/cryptography'
import { makeUserRepository } from '@/main/factories/repositories'
import { makeEmailService } from '@/main/factories/services'

import env from '@/main/config/env'

export const makeForgotPasswordUseCase = () => {
  const userRepository = makeUserRepository()
  const tokenCryptography = makeTokenCryptography()
  const emailService = makeEmailService()

  const forgotPasswordUrl = env.APP_FORGOT_PASSWORD_URL

  return new ForgotPasswordUseCase(
    userRepository,
    tokenCryptography,
    emailService,
    forgotPasswordUrl
  )
}
