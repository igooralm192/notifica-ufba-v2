import { UnsubscribeStudentUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupRepository,
  makeStudentRepository,
} from '@/main/factories/repositories'

export const makeUnsubscribeStudentUseCase = () => {
  const studentRepository = makeStudentRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()

  return new UnsubscribeStudentUseCase(
    studentRepository,
    disciplineGroupRepository,
    disciplineGroupRepository,
  )
}
