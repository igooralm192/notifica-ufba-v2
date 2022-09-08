import { IReadLastMessagesUseCase } from '@/domain/usecases'
import { ReadLastMessagesUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupMessageRepository,
  makeDisciplineGroupRepository,
  makeStudentRepository,
} from '@/main/factories/repositories'

export const makeReadLastMessagesUseCase = (): IReadLastMessagesUseCase => {
  const studentRepository = makeStudentRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const disciplineGroupMessageRepository =
    makeDisciplineGroupMessageRepository()

  return new ReadLastMessagesUseCase(
    studentRepository,
    disciplineGroupRepository,
    disciplineGroupMessageRepository,
  )
}
