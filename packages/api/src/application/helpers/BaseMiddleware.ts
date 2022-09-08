import { InternalServerError } from '@/application/errors'
import { BaseError } from '@/domain/helpers'

export namespace BaseMiddleware {
  export type Request = {
    body?: any
    query?: any
    params?: any
    headers?: any
  }

  export type Response = {
    statusCode: number
    body: any
  }
}

export abstract class BaseMiddleware {
  abstract handle(
    request: BaseMiddleware.Request,
  ): Promise<BaseMiddleware.Response>

  public async perform(
    request: BaseMiddleware.Request,
  ): Promise<BaseMiddleware.Response> {
    try {
      const response = await this.handle(request)

      return response
    } catch (err) {
      return this.fail(err as Error)
    }
  }

  private response(statusCode: number, body: any): BaseMiddleware.Response {
    return { statusCode, body }
  }

  public errorResponse(
    statusCode: number,
    error: BaseError,
  ): BaseMiddleware.Response {
    return this.response(statusCode, {
      code: error.code,
      message: error.message,
      context: error.context,
      stack: error.stack,
    })
  }

  public ok(data: any) {
    return this.response(200, data)
  }

  public badRequest(error: BaseError) {
    return this.errorResponse(400, error)
  }

  public unauthorized(error: BaseError) {
    return this.errorResponse(401, error)
  }

  public forbidden(error: BaseError) {
    return this.errorResponse(403, error)
  }

  public notFound(error: BaseError) {
    return this.errorResponse(404, error)
  }

  public fail(error: Error) {
    return this.errorResponse(500, new InternalServerError(error))
  }
}
