import { DeleteDisciplineGroupUseCase } from '@/data/usecases/discipline-group'
import { makeDisciplineGroupRepository } from '@/main/factories/repositories'

export const makeDeleteDisciplineGroupUseCase = () => {
  const disciplineGroupRepository = makeDisciplineGroupRepository()

  return new DeleteDisciplineGroupUseCase(
    disciplineGroupRepository,
    disciplineGroupRepository,
  )
}
