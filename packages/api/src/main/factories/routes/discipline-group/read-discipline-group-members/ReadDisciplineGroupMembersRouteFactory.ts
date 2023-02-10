import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeReadDisciplineGroupMembersController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeReadDisciplineGroupMembersRoute = (router: Router) => {
  router.get(
    '/:disciplineGroupId/members',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressRouteAdapter.adapt(makeReadDisciplineGroupMembersController()),
  )
}
