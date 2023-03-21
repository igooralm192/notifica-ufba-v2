import { SendFeedbackController } from '@/application/controllers/user'
import { makeSendFeedbackUseCase } from '@/main/factories/usecases'
import { makeSendFeedbackValidation } from '@/main/factories/validation'

export const makeSendFeedbackController = () => {
  const sendFeedbackValidation = makeSendFeedbackValidation()
  const sendFeedbackUseCase = makeSendFeedbackUseCase()

  return new SendFeedbackController(sendFeedbackValidation, sendFeedbackUseCase)
}
