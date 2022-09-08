import { ICreateDisciplineGroupPostUseCase } from '@/domain/usecases'
import { CreateDisciplineGroupPostUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupPostRepository,
  makeDisciplineGroupRepository,
  makeStudentRepository,
  makeUserRepository,
} from '@/main/factories/repositories'
import { makeMessagingService } from '@/main/factories/services'

export const makeCreateDisciplineGroupPostUseCase =
  (): ICreateDisciplineGroupPostUseCase => {
    const userRepository = makeUserRepository()
    const disciplineGroupRepository = makeDisciplineGroupRepository()
    const studentRepository = makeStudentRepository()
    const disciplineGroupPostRepository = makeDisciplineGroupPostRepository()
    const messagingService = makeMessagingService()

    return new CreateDisciplineGroupPostUseCase(
      userRepository,
      disciplineGroupRepository,
      studentRepository,
      disciplineGroupPostRepository,
      messagingService,
    )
  }
