import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeDeleteDisciplineGroupController } from '@/main/factories/controllers'
import { makeAuthorizeTeacherMiddleware, makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeDeleteDisciplineGroupRoute = (router: Router) => {
  router.delete(
    '/:disciplineGroupId',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeTeacherMiddleware()),
    ExpressRouteAdapter.adapt(makeDeleteDisciplineGroupController()),
  )
}
