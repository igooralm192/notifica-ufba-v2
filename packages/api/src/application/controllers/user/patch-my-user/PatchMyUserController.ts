import { UserDoesNotExistError } from '@/domain/errors'
import { IUpdateUserUseCase } from '@/domain/usecases'

import { BaseController } from '@/application/helpers'
import { IValidation } from '@/validation/protocols'

export namespace IPatchMyUserController {
  export type Body = {
    pushToken?: string
  }

  export type Request = BaseController.Request<Body>
}

export class PatchMyUserController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateUserUseCase: IUpdateUserUseCase,
  ) {
    super()
  }

  async handle(
    request: IPatchMyUserController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.updateUserUseCase.run({
      id: { userId },
      data: request.body!,
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
