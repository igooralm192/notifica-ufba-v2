import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeGenerateMessageController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeGenerateMessageRoute = (router: Router) => {
  router.post(
    '/message',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressRouteAdapter.adapt(makeGenerateMessageController()),
  )
}
