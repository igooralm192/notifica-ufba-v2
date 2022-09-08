import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makePatchMyUserController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makePatchMyUserRoute = (router: Router) => {
  router.patch(
    '/users/me',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressRouteAdapter.adapt(makePatchMyUserController()),
  )
}
