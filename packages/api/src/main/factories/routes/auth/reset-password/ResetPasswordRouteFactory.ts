import { ExpressRouteAdapter } from '@/main/adapters'
import { makeResetPasswordController } from '@/main/factories/controllers'

import { Router } from 'express'

export const makeResetPasswordRoute = (router: Router) => {
  router.post(
    '/user/reset',
    ExpressRouteAdapter.adapt(makeResetPasswordController()),
  )
}
