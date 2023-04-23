import { InternalServerError } from '@/application/errors'
import { BaseError } from '@/domain/helpers'

export namespace BaseController {
  export type Request<
    Body = any,
    Query = any,
    Params = any,
    Context = { userId?: string; studentId?: string; teacherId?: string },
    File = { originalName: string; buffer: Buffer; type: string },
  > = {
    body?: Body
    query?: Query
    params?: Params
    context?: Context
    file?: File
  }

  export type Response = {
    statusCode: number
    body: any
  }
}

export abstract class BaseController {
  abstract handle(
    request: BaseController.Request,
  ): Promise<BaseController.Response>

  public async perform(
    request: BaseController.Request,
  ): Promise<BaseController.Response> {
    try {
      const response = await this.handle(request)

      return response
    } catch (err) {
      return this.fail(err as Error)
    }
  }

  private response(statusCode: number, body?: any): BaseController.Response {
    return { statusCode, body }
  }

  public errorResponse(
    statusCode: number,
    error: BaseError,
  ): BaseController.Response {
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

  public noContent() {
    return this.response(204)
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

  public unprocessable(error: BaseError) {
    return this.errorResponse(422, error)
  }

  public fail(error: Error) {
    if (error instanceof BaseError) {
      return this.errorResponse(500, error)
    }

    return this.errorResponse(500, new InternalServerError(error))
  }
}
