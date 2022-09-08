import { ExpressRouteAdapter } from '@/main/adapters'
import { makeReadDisciplinesController } from '@/main/factories/controllers'

import { Router } from 'express'

export const makeReadDisciplinesRoute = (router: Router) => {
  router.get(
    '/disciplines',
    ExpressRouteAdapter.adapt(makeReadDisciplinesController()),
  )
}
