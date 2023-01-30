import { PostMessageController } from '@/application/controllers/discipline-group'
import { makePostMessageValidation } from '@/main/factories/validation'
import { makePostMessageUseCase } from '@/main/factories/usecases'

export const makePostMessageController = () => {
  const validation = makePostMessageValidation()
  const postMessageUseCase = makePostMessageUseCase()

  return new PostMessageController(validation, postMessageUseCase)
}
