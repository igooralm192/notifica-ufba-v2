import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeDeleteDisciplineGroupPostController } from '@/main/factories/controllers'
import {
  makeAuthorizeTeacherMiddleware,
  makeAuthorizeUserMiddleware,
} from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeDeleteDisciplineGroupPostRoute = (router: Router) => {
  router.delete(
    '/:disciplineGroupId/posts/:disciplineGroupPostId',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeTeacherMiddleware()),
    ExpressRouteAdapter.adapt(makeDeleteDisciplineGroupPostController()),
  )
}
