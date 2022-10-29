import { ForgotPasswordController } from '@/application/controllers/user'
import { makeForgotPasswordUseCase } from '@/main/factories/usecases'
import { makeForgotPasswordValidation } from '@/main/factories/validation'

export const makeForgotPasswordController = () => {
  const forgotPasswordValidation = makeForgotPasswordValidation()
  const forgotPasswordUseCase = makeForgotPasswordUseCase()

  return new ForgotPasswordController(
    forgotPasswordValidation,
    forgotPasswordUseCase,
  )
}
