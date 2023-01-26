import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makePatchMyTeacherController } from '@/main/factories/controllers'
import { makeAuthorizeTeacherMiddleware, makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makePatchMyTeacherRoute = (router: Router) => {
  router.patch(
    '/me',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeTeacherMiddleware()),
    ExpressRouteAdapter.adapt(makePatchMyTeacherController()),
  )
}
