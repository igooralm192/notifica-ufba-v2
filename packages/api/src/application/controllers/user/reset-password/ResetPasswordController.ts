import { UserDoesNotExistError } from '@/domain/errors'
import { IResetPasswordUseCase } from '@/domain/usecases'
import { ExpiredTokenError, InvalidTokenError } from '@/data/errors'

import { BaseController } from '@/application/helpers'

import { IValidation } from '@/validation/protocols'

export class ResetPasswordController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly resetPasswordUseCase: IResetPasswordUseCase,
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

    const result = await this.resetPasswordUseCase.resetPassword(request.body)

    if (result.isRight()) {
      return this.noContent()
    }

    switch (result.value.constructor) {
      case UserDoesNotExistError:
        return this.notFound(result.value)
      case ExpiredTokenError:
      case InvalidTokenError:
        return this.forbidden(result.value)
      default:
        return this.fail(result.value)
    }
  }
}
