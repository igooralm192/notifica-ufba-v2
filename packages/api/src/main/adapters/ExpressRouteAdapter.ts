import { BaseController } from '@/application/helpers'

import { Request, Response } from 'express'

export class ExpressRouteAdapter {
  static adapt(controller: BaseController) {
    return async (request: Request, response: Response) => {
      console.log(
        `${request.method} ${request.url}`,
      )

      const controllerResponse = await controller.perform({
        body: request.body,
        query: request.query,
        params: request.params,
        context: request.context,
      })

      if (controllerResponse.statusCode >= 400) {
        console.error(controllerResponse.body)
      }

      return response
        .status(controllerResponse.statusCode)
        .json(controllerResponse.body)
    }
  }
}
