import { makeRouter } from '@/main/factories/routes'

import { Express } from 'express'

export const makeRoutes = (app: Express) => {
  app.use('/api', makeRouter())
}
