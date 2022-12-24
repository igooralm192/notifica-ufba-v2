import { StudentDoesNotExistError } from '@/domain/errors'
import { IUpdateStudentUseCase } from '@/domain/usecases'

import { BaseController } from '@/application/helpers'
import { IValidation } from '@/validation/protocols'

export namespace IPatchMyStudentController {
  export type Body = IUpdateStudentUseCase.Input['data']

  export type Request = BaseController.Request<Body>
}

export class PatchMyStudentController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateStudentUseCase: IUpdateStudentUseCase,
  ) {
    super()
  }

  async handle(
    request: IPatchMyStudentController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.updateStudentUseCase.run({
      where: { userId },
      data: request.body!,
    })

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case StudentDoesNotExistError:
        return this.notFound(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
