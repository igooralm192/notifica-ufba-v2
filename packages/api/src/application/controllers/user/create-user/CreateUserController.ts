import { UserAlreadyExistsError } from '@/domain/errors'
import { ICreateUserUseCase } from '@/domain/usecases'

import { BaseController } from '@/application/helpers'

import { IValidation } from '@/validation/protocols'

export class CreateUserController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly createUserUseCase: ICreateUserUseCase,
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

    const result = await this.createUserUseCase.run(request.body)

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case UserAlreadyExistsError:
        return this.forbidden(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
