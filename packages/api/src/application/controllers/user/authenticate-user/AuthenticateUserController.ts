import { UserDoesNotExistError, WrongPasswordError } from '@/domain/errors'
import { IAuthenticateUserUseCase } from '@/domain/usecases'

import { BaseController } from '@/application/helpers'

import { IValidation } from '@/validation/protocols'

export class AuthenticateUserController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {
    super()
  }

  async handle(
    request: BaseController.Request,
  ): Promise<BaseController.Response> {
    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.authenticateUserUseCase.run(request.body)

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case UserDoesNotExistError:
        return this.notFound(result.value)

      case WrongPasswordError:
        return this.unauthorized(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
