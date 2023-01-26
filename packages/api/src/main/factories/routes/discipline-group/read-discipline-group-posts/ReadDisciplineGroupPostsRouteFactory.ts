import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeReadDisciplineGroupPostsController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeReadDisciplineGroupPostsRoute = (router: Router) => {
  router.get(
    '/:disciplineGroupId/posts',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressRouteAdapter.adapt(makeReadDisciplineGroupPostsController()),
  )
}
