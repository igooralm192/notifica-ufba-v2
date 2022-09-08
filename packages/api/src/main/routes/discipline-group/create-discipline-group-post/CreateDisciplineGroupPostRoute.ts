import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeCreateDisciplineGroupPostController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeCreateDisciplineGroupPostRoute = (router: Router) => {
  router.post(
    '/discipline-groups/:disciplineGroupId/posts',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressRouteAdapter.adapt(makeCreateDisciplineGroupPostController()),
  )
}
