import { AuthorizeTeacherMiddleware } from '@/application/middlewares'
import { makeTeacherRepository } from '@/main/factories/repositories'

export const makeAuthorizeTeacherMiddleware = () => {
  const teacherRepository = makeTeacherRepository()

  return new AuthorizeTeacherMiddleware(teacherRepository)
}
