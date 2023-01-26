import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makePatchMyStudentController } from '@/main/factories/controllers'
import { makeAuthorizeStudentMiddleware, makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makePatchMyStudentRoute = (router: Router) => {
  router.patch(
    '/me',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeStudentMiddleware()),
    ExpressRouteAdapter.adapt(makePatchMyStudentController()),
  )
}
