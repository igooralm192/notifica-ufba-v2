import { ExpressRouteAdapter } from '@/main/adapters'
import { makeCreateStudentController } from '@/main/factories/controllers'

import { Router } from 'express'

const { adapt } = ExpressRouteAdapter

export const makeCreateStudentRoute = (router: Router) => {
  router.post('/students', adapt(makeCreateStudentController()))
}
