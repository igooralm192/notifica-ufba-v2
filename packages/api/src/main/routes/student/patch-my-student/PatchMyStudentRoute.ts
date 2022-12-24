import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makePatchMyStudentController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makePatchMyStudentRoute = (router: Router) => {
  router.patch(
    '/students/me',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressRouteAdapter.adapt(makePatchMyStudentController()),
  )
}
