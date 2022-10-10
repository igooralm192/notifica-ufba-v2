import { SubscribeStudentToDisciplineGroupUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupRepository,
  makeStudentRepository,
} from '@/main/factories/repositories'

export const makeSubscribeStudentToDisciplineGroupUseCase = () => {
  const studentRepository = makeStudentRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()

  return new SubscribeStudentToDisciplineGroupUseCase(
    studentRepository,
    disciplineGroupRepository,
    disciplineGroupRepository,
  )
}
