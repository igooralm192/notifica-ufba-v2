import { AuthorizeUserMiddleware } from '@/application/middlewares'
import { makeGetUserIdByTokenUseCase } from '@/main/factories/usecases'

export const makeAuthorizeUserMiddleware = () => {
  const getUserIdByToken = makeGetUserIdByTokenUseCase()

  return new AuthorizeUserMiddleware(getUserIdByToken)
}
