import { BaseController } from '@/application/helpers'

import { Request, Response } from 'express'

export class ExpressRouteAdapter {
  static adapt(controller: BaseController) {
    return async (request: Request, response: Response) => {
      console.log(`${request.method} ${request.originalUrl}`)

      const controllerResponse = await controller.perform({
        body: request.body,
        query: request.query,
        params: request.params,
        context: request.context,
        file: request.file
          ? {
              originalName: request.file.originalname,
              buffer: request.file.buffer,
              type: request.file.mimetype,
            }
          : undefined,
      })

      if (controllerResponse.statusCode >= 400) {
        console.log({
          url: request.url,
          error: controllerResponse.body,
        })
      }

      return response
        .status(controllerResponse.statusCode)
        .json(controllerResponse.body)
    }
  }
}
