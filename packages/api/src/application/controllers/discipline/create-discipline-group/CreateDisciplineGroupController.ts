import {
  DisciplineDoesNotExistError,
  PermissionDeniedError,
  UserDoesNotExistError,
} from '@/domain/errors'
import { ICreateDisciplineGroupUseCase } from '@/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'
import { IValidation } from '@/validation/protocols'

export namespace ICreateDisciplineGroupController {
  export type Params = ICreateDisciplineGroupUseCase.Params
  export type Body = ICreateDisciplineGroupUseCase.Body

  export type Request = BaseController.Request<Body, any, Params>
}

export class CreateDisciplineGroupController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly createDisciplineGroupUseCase: ICreateDisciplineGroupUseCase,
  ) {
    super()
  }

  async handle(
    request: ICreateDisciplineGroupController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId
    const disciplineId = request.params?.disciplineId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    if (!disciplineId) {
      return this.badRequest(new MissingParamsError())
    }

    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.createDisciplineGroupUseCase.create(
      { disciplineId, userId },
      request.body,
    )

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case DisciplineDoesNotExistError:
      case UserDoesNotExistError:
        return this.notFound(result.value)
      case PermissionDeniedError:
        return this.forbidden(result.value)
      default:
        return this.fail(result.value)
    }
  }
}
