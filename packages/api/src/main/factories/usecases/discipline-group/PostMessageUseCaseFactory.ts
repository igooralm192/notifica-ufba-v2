import { IPostMessageUseCase } from '@/domain/usecases'
import { PostMessageUseCase } from '@/data/usecases/discipline-group'
import {
  makeDisciplineGroupMessageRepository,
  makeDisciplineGroupRepository,
  makeStudentRepository,
  makeTeacherRepository,
  makeUserRepository,
} from '@/main/factories/repositories'
import { makeCreateNotificationUseCase } from '@/main/factories/usecases'

export const makePostMessageUseCase = (): IPostMessageUseCase => {
  const userRepository = makeUserRepository()
  const disciplineGroupRepository = makeDisciplineGroupRepository()
  const teacherRepository = makeTeacherRepository()
  const studentRepository = makeStudentRepository()
  const disciplineGroupMessageRepository =
    makeDisciplineGroupMessageRepository()
  const createNotificationUseCase = makeCreateNotificationUseCase()

  return new PostMessageUseCase(
    userRepository,
    disciplineGroupRepository,
    teacherRepository,
    studentRepository,
    disciplineGroupMessageRepository,
    createNotificationUseCase,
  )
}
