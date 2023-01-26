import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeReadLastMessagesController } from '@/main/factories/controllers'
import {
  makeAuthorizeStudentMiddleware,
  makeAuthorizeUserMiddleware,
} from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeReadLastMessagesRoute = (router: Router) => {
  // TODO: Change to student router
  router.get(
    '/last-messages',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeStudentMiddleware()),
    ExpressRouteAdapter.adapt(makeReadLastMessagesController()),
  )
}
