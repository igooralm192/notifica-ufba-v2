import { TeacherDoesNotExistError } from '@/domain/errors'
import { IUpdateTeacherUseCase } from '@/domain/usecases'

import { BaseController } from '@/application/helpers'
import { IValidation } from '@/validation/protocols'

export namespace IPatchMyTeacherController {
  export type Body = IUpdateTeacherUseCase.Input['data']

  export type Request = BaseController.Request<Body>
}

export class PatchMyTeacherController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly updateTeacherUseCase: IUpdateTeacherUseCase,
  ) {
    super()
  }

  async handle(
    request: IPatchMyTeacherController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.updateTeacherUseCase.run({
      where: { userId },
      data: request.body!,
    })

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case TeacherDoesNotExistError:
        return this.notFound(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
