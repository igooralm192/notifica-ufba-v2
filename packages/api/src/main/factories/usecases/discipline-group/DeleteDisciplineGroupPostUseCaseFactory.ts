import { DeleteDisciplineGroupPostUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupPostRepository,
  makeDisciplineGroupRepository,
} from '@/main/factories/repositories'

export const makeDeleteDisciplineGroupPostUseCase = () => {
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const disciplineGroupPostRepository = makeDisciplineGroupPostRepository()

  return new DeleteDisciplineGroupPostUseCase(
    disciplineGroupRepository,
    disciplineGroupPostRepository,
    disciplineGroupPostRepository,
  )
}
