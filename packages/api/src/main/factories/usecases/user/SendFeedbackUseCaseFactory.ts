import { SendFeedbackUseCase } from '@/data/usecases/user'
import { makeEmailService } from '@/main/factories/services'

export const makeSendFeedbackUseCase = () => {
  const emailService = makeEmailService()

  return new SendFeedbackUseCase(emailService)
}
