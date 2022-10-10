import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeUnsubscribeStudentController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeUnsubscribeStudentRoute = (router: Router) => {
  router.delete(
    '/discipline-groups/:disciplineGroupId/subscribe',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressRouteAdapter.adapt(
      makeUnsubscribeStudentController(),
    ),
  )
}
