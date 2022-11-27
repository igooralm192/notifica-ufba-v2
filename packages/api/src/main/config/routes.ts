import { makeReadDisciplinesRoute } from '@/main/routes/discipline'
import {
  makeCreateDisciplineGroupPostRoute,
  makePostMessageRoute,
  makeReadDisciplineGroupPostsRoute,
  makeReadDisciplineGroupRoute,
  makeReadDisciplineGroupsRoute,
  makeReadLastMessagesRoute,
  makeSubscribeStudentToDisciplineGroupRoute,
  makeUnsubscribeStudentRoute,
} from '@/main/routes/discipline-group'
import { makeCreateStudentRoute } from '@/main/routes/student'
import {
  makeAuthenticateUserRoute,
  makeForgotPasswordRoute,
  makeGetMyUserRoute,
  makePatchMyUserRoute,
  makeResetPasswordRoute,
} from '@/main/routes/user'

import { Express, Router } from 'express'

export const makeRoutes = (app: Express) => {
  const router = Router()

  app.use('/api', router)

  makeAuthenticateUserRoute(router)
  makeCreateDisciplineGroupPostRoute(router)
  makeCreateStudentRoute(router)
  makeGetMyUserRoute(router)
  makeForgotPasswordRoute(router)
  makePatchMyUserRoute(router)
  makePostMessageRoute(router)
  makeReadLastMessagesRoute(router)
  makeReadDisciplineGroupPostsRoute(router)
  makeReadDisciplineGroupsRoute(router)
  makeReadDisciplineGroupRoute(router)
  makeReadDisciplinesRoute(router)
  makeResetPasswordRoute(router)
  makeSubscribeStudentToDisciplineGroupRoute(router)
  makeUnsubscribeStudentRoute(router)
}
