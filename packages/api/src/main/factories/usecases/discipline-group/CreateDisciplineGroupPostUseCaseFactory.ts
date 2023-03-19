import { ICreateDisciplineGroupPostUseCase } from '@/domain/usecases'
import { CreateDisciplineGroupPostUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupPostRepository,
  makeDisciplineGroupRepository,
  makeStudentRepository,
  makeUserRepository,
} from '@/main/factories/repositories'
import { makeCreateNotificationUseCase } from '@/main/factories/usecases'

export const makeCreateDisciplineGroupPostUseCase =
  (): ICreateDisciplineGroupPostUseCase => {
    const userRepository = makeUserRepository()
    const disciplineGroupRepository = makeDisciplineGroupRepository()
    const studentRepository = makeStudentRepository()
    const disciplineGroupPostRepository = makeDisciplineGroupPostRepository()
    const createNotificationUseCase = makeCreateNotificationUseCase()

    return new CreateDisciplineGroupPostUseCase(
      userRepository,
      disciplineGroupRepository,
      studentRepository,
      disciplineGroupPostRepository,
      createNotificationUseCase,
    )
  }
