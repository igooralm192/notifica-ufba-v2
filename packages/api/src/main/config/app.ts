import express, { Express } from 'express'

import { makeRoutes } from './routes'

export const makeApp = (): Express => {
  const app = express()

  app.use(express.json())
  makeRoutes(app)

  return app
}
