import { DeleteDisciplineGroupUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupMessageRepository,
  makeDisciplineGroupPostRepository,
  makeDisciplineGroupRepository,
} from '@/main/factories/repositories'

export const makeDeleteDisciplineGroupUseCase = () => {
  const disciplineGroupPostRepository = makeDisciplineGroupPostRepository()
  const disciplineGroupMessageRepository =
    makeDisciplineGroupMessageRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()

  return new DeleteDisciplineGroupUseCase(
    disciplineGroupRepository,
    disciplineGroupPostRepository,
    disciplineGroupMessageRepository,
    disciplineGroupRepository,
  )
}
