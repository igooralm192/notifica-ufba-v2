import { StudentAlreadyExistsError } from '@/domain/errors'
import { ICreateStudentUseCase } from '@/domain/usecases'

import { BaseController } from '@/application/helpers'

import { IValidation } from '@/validation/protocols'

export class CreateStudentController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly createStudentUseCase: ICreateStudentUseCase,
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

    const result = await this.createStudentUseCase.run(request.body)

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case StudentAlreadyExistsError:
        return this.forbidden(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
