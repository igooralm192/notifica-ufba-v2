import { BaseError } from '@/domain/helpers'
import { InternalServerError } from '@/application/errors'
import { Request, Response } from '@/application/helpers/types'
export abstract class BaseMiddleware {
  protected abstract handle(request: Request): Promise<Response>

  public async perform(request: Request): Promise<Response> {
    try {
      const response = await this.handle(request)

      return response
    } catch (err) {
      return this.fail(err as Error)
    }
  }

  private response(statusCode: number, body: any): Response {
    return { statusCode, body }
  }

  protected errorResponse(
    statusCode: number,
    error: BaseError,
  ): Response {
    return this.response(statusCode, {
      code: error.code,
      message: error.message,
      context: error.context,
      stack: error.stack,
    })
  }

  protected ok<T>(data: T) {
    return this.response(200, data)
  }

  protected badRequest(error: BaseError) {
    return this.errorResponse(400, error)
  }

  protected unauthorized(error: BaseError) {
    return this.errorResponse(401, error)
  }

  protected forbidden(error: BaseError) {
    return this.errorResponse(403, error)
  }

  protected notFound(error: BaseError) {
    return this.errorResponse(404, error)
  }

  protected fail(error: Error) {
    return this.errorResponse(500, new InternalServerError(error))
  }
}
