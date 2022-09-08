import { UserDoesNotExistError } from '@/domain/errors'
import { IGetUserByIdUseCase } from '@/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'

export class GetMyUserController extends BaseController {
  constructor(private readonly getUserByIdUseCase: IGetUserByIdUseCase) {
    super()
  }

  async handle(
    request: BaseController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    const result = await this.getUserByIdUseCase.run({ userId })

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
