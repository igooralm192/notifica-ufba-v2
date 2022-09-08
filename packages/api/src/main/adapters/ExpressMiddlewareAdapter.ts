import { BaseMiddleware } from '@/application/helpers'

import { NextFunction, Request, Response } from 'express'

export class ExpressMiddlewareAdapter {
  static adapt(middleware: BaseMiddleware) {
    return async (request: Request, response: Response, next: NextFunction) => {
      const middlewareResponse = await middleware.perform({
        body: request.body,
        headers: request.headers,
      })

      if (middlewareResponse.statusCode === 200) {
        request.context = middlewareResponse.body

        return next()
      }

      if (middlewareResponse.statusCode >= 400) {
        console.error(middlewareResponse.body)
      }

      return response
        .status(middlewareResponse.statusCode)
        .json(middlewareResponse.body)
    }
  }
}
