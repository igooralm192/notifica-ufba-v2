import { UserDoesNotExistError } from '@/domain/errors'
import { IForgotPasswordUseCase } from '@/domain/usecases'

import { BaseController } from '@/application/helpers'

import { IValidation } from '@/validation/protocols'

export class ForgotPasswordController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly forgotPasswordUseCase: IForgotPasswordUseCase,
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

    const result = await this.forgotPasswordUseCase.forgotPassword(request.body)

    if (result.isRight()) {
      return this.noContent()
    }

    switch (result.value.constructor) {
      case UserDoesNotExistError:
        return this.notFound(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
