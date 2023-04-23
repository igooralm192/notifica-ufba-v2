import { Router } from 'express'

import * as AuthRoutes from './auth'
import * as DisciplineRoutes from './discipline'
import * as DisciplineGroupRoutes from './discipline-group'
import * as ExperimentRoutes from './experiment'
import * as StudentRoutes from './student'
import * as TeacherRoutes from './teacher'
import * as UserRoutes from './user'

export type RouteFactory = (router: Router) => void

export const configureRoutes = (routes: Record<string, RouteFactory>) => {
  const router = Router()

  for (const makeRoute of Object.values(routes)) {
    makeRoute(router)
  }

  return router
}

export const makeRouter = () => {
  const router = Router()

  router.use('/auth', configureRoutes(AuthRoutes))
  router.use('/disciplines', configureRoutes(DisciplineRoutes))
  router.use('/discipline-groups', configureRoutes(DisciplineGroupRoutes))
  router.use('/experiment', configureRoutes(ExperimentRoutes))
  router.use('/students', configureRoutes(StudentRoutes))
  router.use('/teacher', configureRoutes(TeacherRoutes))
  router.use('/users', configureRoutes(UserRoutes))

  return router
}
