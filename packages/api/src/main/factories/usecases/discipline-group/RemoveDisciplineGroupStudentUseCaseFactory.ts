import { RemoveDisciplineGroupStudentUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupRepository,
  makeStudentRepository,
  makeTeacherRepository,
} from '@/main/factories/repositories'
import { makeMessagingService } from '@/main/factories/services'
import { makeUnsubscribeStudentUseCase } from '@/main/factories/usecases'

export const makeRemoveDisciplineGroupStudentUseCase = () => {
  const studentRepository = makeStudentRepository()
  const teacherRepository = makeTeacherRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const unsubscribeStudentUseCase = makeUnsubscribeStudentUseCase()
  const messagingService = makeMessagingService()

  return new RemoveDisciplineGroupStudentUseCase(
    studentRepository,
    teacherRepository,
    disciplineGroupRepository,
    unsubscribeStudentUseCase,
    messagingService,
  )
}
