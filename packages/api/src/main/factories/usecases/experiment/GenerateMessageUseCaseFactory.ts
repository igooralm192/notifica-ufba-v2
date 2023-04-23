import { GenerateMessageUseCase } from '@/data/usecases/experiment'
import {
  makeDisciplineGroupRepository,
  makeUserRepository,
} from '@/main/factories/repositories'
import { makePostMessageUseCase } from '@/main/factories/usecases'

export const makeGenerateMessageUseCase = () => {
  const userRepository = makeUserRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const postMessage = makePostMessageUseCase()

  return new GenerateMessageUseCase(
    userRepository,
    disciplineGroupRepository,
    postMessage,
  )
}
