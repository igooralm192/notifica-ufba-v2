import { ResetPasswordController } from '@/application/controllers/user'
import { makeResetPasswordUseCase } from '@/main/factories/usecases'
import { makeResetPasswordValidation } from '@/main/factories/validation'

export const makeResetPasswordController = () => {
  const resetPasswordValidation = makeResetPasswordValidation()
  const resetPasswordUseCase = makeResetPasswordUseCase()

  return new ResetPasswordController(
    resetPasswordValidation,
    resetPasswordUseCase,
  )
}
