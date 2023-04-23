import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeGeneratePostController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeGeneratePostRoute = (router: Router) => {
  router.post(
    '/post',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressRouteAdapter.adapt(makeGeneratePostController()),
  )
}
