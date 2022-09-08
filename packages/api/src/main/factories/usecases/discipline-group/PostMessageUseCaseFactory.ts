import { IPostMessageUseCase } from '@/domain/usecases'
import { PostMessageUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupMessageRepository,
  makeDisciplineGroupRepository,
  makeStudentRepository,
  makeUserRepository,
} from '@/main/factories/repositories'
import { makeMessagingService } from '@/main/factories/services'

export const makePostMessageUseCase = (): IPostMessageUseCase => {
  const userRepository = makeUserRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const studentRepository = makeStudentRepository()
  const disciplineGroupMessageRepository =
    makeDisciplineGroupMessageRepository()
  const messagingService = makeMessagingService()

  return new PostMessageUseCase(
    userRepository,
    disciplineGroupRepository,
    studentRepository,
    disciplineGroupMessageRepository,
    messagingService,
  )
}
