import { makeReadDisciplinesRoute } from '@/main/routes/discipline'
import {
  makeCreateDisciplineGroupPostRoute,
  makePostMessageRoute,
  makeReadDisciplineGroupPostsRoute,
  makeReadDisciplineGroupRoute,
  makeReadDisciplineGroupsRoute,
  makeReadLastMessagesRoute,
  makeSubscribeStudentToDisciplineGroupRoute,
} from '@/main/routes/discipline-group'
import { makeCreateStudentRoute } from '@/main/routes/student'
import {
  makeAuthenticateUserRoute,
  makeGetMyUserRoute,
  makePatchMyUserRoute,
} from '@/main/routes/user'

import { Express, Router } from 'express'

export const makeRoutes = (app: Express) => {
  const router = Router()

  app.use('/api', router)

  makeAuthenticateUserRoute(router)
  makeCreateDisciplineGroupPostRoute(router)
  makeCreateStudentRoute(router)
  makeGetMyUserRoute(router)
  makePatchMyUserRoute(router)
  makePostMessageRoute(router)
  makeReadLastMessagesRoute(router)
  makeReadDisciplineGroupPostsRoute(router)
  makeReadDisciplineGroupsRoute(router)
  makeReadDisciplineGroupRoute(router)
  makeReadDisciplinesRoute(router)
  makeSubscribeStudentToDisciplineGroupRoute(router)
}
