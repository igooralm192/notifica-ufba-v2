import { ExpressRouteAdapter } from '@/main/adapters'
import { makeAuthenticateUserController } from '@/main/factories/controllers'

import { Router } from 'express'

export const makeAuthenticateUserRoute = (router: Router) => {
  router.post(
    '/user',
    ExpressRouteAdapter.adapt(makeAuthenticateUserController()),
  )
}
