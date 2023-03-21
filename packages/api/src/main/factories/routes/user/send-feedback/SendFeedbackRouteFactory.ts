import { ExpressRouteAdapter } from '@/main/adapters'
import { makeSendFeedbackController } from '@/main/factories/controllers'

import { Router } from 'express'

export const makeSendFeedbackRoute = (router: Router) => {
  router.post(
    '/send-feedback',
    ExpressRouteAdapter.adapt(makeSendFeedbackController()),
  )
}
