import { ExpressMiddlewareAdapter, ExpressRouteAdapter } from '@/main/adapters'
import { makeUpdateUserPictureController } from '@/main/factories/controllers'
import { makeAuthorizeUserMiddleware } from '@/main/factories/middlewares'
import { Router } from 'express'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const makeUpdateUserPictureRoute = (router: Router) => {
  router.put(
    '/me/profile-picture',
    ExpressMiddlewareAdapter.adapt(makeAuthorizeUserMiddleware()),
    upload.single('picture'),
    ExpressRouteAdapter.adapt(makeUpdateUserPictureController()),
  )
}
