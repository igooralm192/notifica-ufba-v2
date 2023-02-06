import { DeleteDisciplineGroupPostController } from '@/application/controllers/discipline-group'
import { makeDeleteDisciplineGroupPostUseCase } from '@/main/factories/usecases'

export const makeDeleteDisciplineGroupPostController = () => {
  const deleteDisciplineGroupPostUseCase =
    makeDeleteDisciplineGroupPostUseCase()

  return new DeleteDisciplineGroupPostController(
    deleteDisciplineGroupPostUseCase,
  )
}
