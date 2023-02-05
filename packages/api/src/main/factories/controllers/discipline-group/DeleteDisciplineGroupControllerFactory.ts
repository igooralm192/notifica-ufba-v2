import { DeleteDisciplineGroupController } from '@/application/controllers/discipline-group'
import { makeDeleteDisciplineGroupUseCase } from '@/main/factories/usecases'

export const makeDeleteDisciplineGroupController = () => {
  const deleteDisciplineGroupUseCase = makeDeleteDisciplineGroupUseCase()

  return new DeleteDisciplineGroupController(
    deleteDisciplineGroupUseCase,
  )
}
