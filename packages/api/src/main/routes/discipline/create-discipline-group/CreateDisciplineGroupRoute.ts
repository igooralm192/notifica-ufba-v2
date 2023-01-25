import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeCreateDisciplineGroupController } from '@/main/factories/controllers'
import { makeAuthorizeTeacherMiddleware, makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeCreateDisciplineGroupRoute = (router: Router) => {
  router.post(
    '/disciplines/:disciplineId/groups',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeTeacherMiddleware()),
    ExpressRouteAdapter.adapt(makeCreateDisciplineGroupController()),
  )
}
