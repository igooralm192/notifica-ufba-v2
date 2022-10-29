import { ExpressRouteAdapter } from '@/main/adapters'
import { makeForgotPasswordController } from '@/main/factories/controllers'

import { Router } from 'express'

export const makeForgotPasswordRoute = (router: Router) => {
  router.post(
    '/auth/user/forgot',
    ExpressRouteAdapter.adapt(makeForgotPasswordController()),
  )
}
