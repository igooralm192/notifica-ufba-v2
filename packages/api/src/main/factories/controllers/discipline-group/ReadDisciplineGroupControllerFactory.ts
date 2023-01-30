import { ReadDisciplineGroupController } from '@/application/controllers/discipline-group'
import { makeReadDisciplineGroupUseCase } from '@/main/factories/usecases'

export const makeReadDisciplineGroupController = () => {
  const readDisciplineGroupUseCase = makeReadDisciplineGroupUseCase()

  return new ReadDisciplineGroupController(readDisciplineGroupUseCase)
}
