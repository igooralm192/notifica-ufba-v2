import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeUnsubscribeStudentController } from '@/main/factories/controllers'
import { makeAuthorizeStudentMiddleware, makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeUnsubscribeStudentRoute = (router: Router) => {
  router.delete(
    '/:disciplineGroupId/subscribe',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeStudentMiddleware()),
    ExpressRouteAdapter.adapt(makeUnsubscribeStudentController()),
  )
}
