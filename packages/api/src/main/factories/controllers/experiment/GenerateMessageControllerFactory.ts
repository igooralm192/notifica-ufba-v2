import { GenerateMessageController } from '@/application/controllers/experiment'
import { makeGenerateMessageUseCase } from '@/main/factories/usecases'

export const makeGenerateMessageController = () => {
  const generateMessageUseCase = makeGenerateMessageUseCase()

  return new GenerateMessageController(generateMessageUseCase)
}
