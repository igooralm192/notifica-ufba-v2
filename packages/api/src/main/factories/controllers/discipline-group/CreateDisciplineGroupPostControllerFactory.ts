import { CreateDisciplineGroupPostController } from '@/application/controllers/discipline-group'
import { makeCreateDisciplineGroupPostValidation } from '@/main/factories/validation'
import { makeCreateDisciplineGroupPostUseCase } from '@/main/factories/usecases'

export const makeCreateDisciplineGroupPostController = () => {
  const validation = makeCreateDisciplineGroupPostValidation()
  const createDisciplineGroupPostUseCase =
    makeCreateDisciplineGroupPostUseCase()

  return new CreateDisciplineGroupPostController(
    validation,
    createDisciplineGroupPostUseCase,
  )
}
