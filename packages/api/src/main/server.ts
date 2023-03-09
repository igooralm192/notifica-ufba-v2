// import 'module-alias/register'

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

if (process.env.NODE_ENV === 'production') require('module-alias/register')

console.log(process.env.NODE_ENV)

import { makeApp } from '@/main/config/app'
import env from '@/main/config/env'
import { makeDBClient } from '@/main/factories/helpers'

import '@/main/config/firebase'

makeDBClient()
  .connect()
  .then(() => {
    const app = makeApp()

    app.get('/redirect', (req, res) => {
      const url = req.query?.url

      if (!url) res.json({ fail: true })

      res.send(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>HTML render demo</title>
        </head>
        <body>
          <script>window.location.replace('${url}');</script>
        </body>
      </html>
      `)
    })

    app.listen(env.PORT, () =>
      console.log(`Running at http://localhost:${env.PORT}!!`),
    )
  })
  .catch(console.error)

process.on('SIGTERM', () => {
  process.exit()
})
