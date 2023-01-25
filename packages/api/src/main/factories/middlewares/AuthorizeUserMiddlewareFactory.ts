import { AuthorizeUserMiddleware } from '@/application/middlewares'
import {
  makeGetUserByIdUseCase,
  makeGetUserIdByTokenUseCase,
} from '@/main/factories/usecases'

export const makeAuthorizeUserMiddleware = () => {
  const getUserIdByTokenUseCase = makeGetUserIdByTokenUseCase()
  const getUserByIdUseCase = makeGetUserByIdUseCase()

  return new AuthorizeUserMiddleware(
    getUserIdByTokenUseCase,
    getUserByIdUseCase,
  )
}
