import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeRemoveDisciplineGroupStudentController } from '@/main/factories/controllers'
import { makeAuthorizeTeacherMiddleware, makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'

import { Router } from 'express'

export const makeRemoveDisciplineGroupStudentRoute = (router: Router) => {
  router.delete(
    '/:disciplineGroupId/students/:studentId',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    ExpressMiddlewareAdapter.adapt(makeAuthorizeTeacherMiddleware()),
    ExpressRouteAdapter.adapt(makeRemoveDisciplineGroupStudentController()),
  )
}
