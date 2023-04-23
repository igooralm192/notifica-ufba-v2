import { GeneratePostUseCase } from '@/data/usecases/experiment'
import {
  makeDisciplineGroupRepository,
  makeUserRepository,
} from '@/main/factories/repositories'
import { makeCreateDisciplineGroupPostUseCase } from '@/main/factories/usecases'

export const makeGeneratePostUseCase = () => {
  const userRepository = makeUserRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const createDisciplineGroupPostUseCase =
    makeCreateDisciplineGroupPostUseCase()

  return new GeneratePostUseCase(
    userRepository,
    disciplineGroupRepository,
    createDisciplineGroupPostUseCase,
  )
}
