import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeSubscribeStudentToDisciplineGroupController } from '@/main/factories/controllers'
import {
  makeAuthorizeStudentMiddleware,
  makeAuthorizeUserMiddleware,
} from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeSubscribeStudentToDisciplineGroupRoute = (router: Router) => {
  router.post(
    '/discipline-groups/:disciplineGroupId/subscribe',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeStudentMiddleware()),
    ExpressRouteAdapter.adapt(
      makeSubscribeStudentToDisciplineGroupController(),
    ),
  )
}
