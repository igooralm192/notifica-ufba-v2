import { UserDoesNotExistError } from '@/domain/errors'
import { IReadUserPictureUrlUseCase } from '@/domain/usecases'
import { BaseController } from '@/application/helpers'
import { MissingParamsError } from '@/application/errors'

export namespace IReadUserPictureUrlController {
  export type Params = IReadUserPictureUrlUseCase.Params

  export type Request = BaseController.Request<any, any, Params>
}

export class ReadUserPictureUrlController extends BaseController {
  constructor(
    private readonly readUserPictureUrlUseCase: IReadUserPictureUrlUseCase,
  ) {
    super()
  }

  async handle(
    request: IReadUserPictureUrlController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.params?.userId

    if (!userId) return this.badRequest(new MissingParamsError())

    const result = await this.readUserPictureUrlUseCase.readPictureUrl({
      userId,
    })

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case UserDoesNotExistError:
        return this.notFound(result.value)
      default:
        return this.fail(result.value)
    }
  }
}
