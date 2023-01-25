import { AuthorizeStudentMiddleware } from '@/application/middlewares'
import { makeStudentRepository } from '@/main/factories/repositories'

export const makeAuthorizeStudentMiddleware = () => {
  const studentRepository = makeStudentRepository()

  return new AuthorizeStudentMiddleware(studentRepository)
}
