import { RemoveDisciplineGroupStudentUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupRepository,
  makeStudentRepository,
  makeTeacherRepository,
} from '@/main/factories/repositories'
import {
  makeCreateNotificationUseCase,
  makeUnsubscribeStudentUseCase,
} from '@/main/factories/usecases'

export const makeRemoveDisciplineGroupStudentUseCase = () => {
  const studentRepository = makeStudentRepository()
  const teacherRepository = makeTeacherRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const unsubscribeStudentUseCase = makeUnsubscribeStudentUseCase()
  const createNotificationUseCase = makeCreateNotificationUseCase()

  return new RemoveDisciplineGroupStudentUseCase(
    studentRepository,
    teacherRepository,
    disciplineGroupRepository,
    unsubscribeStudentUseCase,
    createNotificationUseCase,
  )
}
