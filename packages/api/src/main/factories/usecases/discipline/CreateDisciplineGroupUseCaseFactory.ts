import { CreateDisciplineGroupUseCase } from '@/data/usecases/discipline'
import { ICreateDisciplineGroupUseCase } from '@/domain/usecases'
import {
  makeDisciplineGroupRepository,
  makeDisciplineRepository,
  makeUserRepository,
} from '@/main/factories/repositories'

export const makeCreateDisciplineGroupUseCase =
  (): ICreateDisciplineGroupUseCase => {
    const userRepository = makeUserRepository()
    const disciplineRepository = makeDisciplineRepository()
    const disciplineGroupRepository = makeDisciplineGroupRepository()

    return new CreateDisciplineGroupUseCase(
      userRepository,
      disciplineRepository,
      disciplineGroupRepository,
      disciplineGroupRepository,
    )
  }
