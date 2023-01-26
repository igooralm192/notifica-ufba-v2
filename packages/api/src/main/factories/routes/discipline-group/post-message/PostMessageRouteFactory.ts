import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makePostMessageController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makePostMessageRoute = (router: Router) => {
  router.post(
    '/:disciplineGroupId/messages',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressRouteAdapter.adapt(makePostMessageController()),
  )
}
