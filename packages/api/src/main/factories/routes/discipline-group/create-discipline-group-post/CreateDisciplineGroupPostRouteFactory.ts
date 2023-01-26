import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeCreateDisciplineGroupPostController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware, makeAuthorizeTeacherMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeCreateDisciplineGroupPostRoute = (router: Router) => {
  router.post(
    '/:disciplineGroupId/posts',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeTeacherMiddleware()),
    ExpressRouteAdapter.adapt(makeCreateDisciplineGroupPostController()),
  )
}
