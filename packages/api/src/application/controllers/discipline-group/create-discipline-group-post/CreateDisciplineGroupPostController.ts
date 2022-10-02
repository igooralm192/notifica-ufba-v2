import {
  DisciplineGroupDoesNotExistError,
  PermissionDeniedError,
  UserDoesNotExistError,
} from '@/domain/errors'
import { ICreateDisciplineGroupPostUseCase } from '@/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'
import { IValidation } from '@/validation/protocols'

export namespace ICreateDisciplineGroupPostController {
  export type Body = {
    title?: string
    content?: string
  }

  export type Params = {
    disciplineGroupId?: string
  }

  export type Request = BaseController.Request<Body, any, Params>
}

export class CreateDisciplineGroupPostController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly createDisciplineGroupPostUseCase: ICreateDisciplineGroupPostUseCase,
  ) {
    super()
  }

  async handle(
    request: ICreateDisciplineGroupPostController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId
    const disciplineGroupId = request.params?.disciplineGroupId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    if (!disciplineGroupId) {
      return this.badRequest(new MissingParamsError())
    }

    const validationError = this.validation.validate(request.body)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.createDisciplineGroupPostUseCase.run({
      userId,
      disciplineGroupId,
      title: request.body!.title,
      content: request.body!.content!,
    })

    if (result.isRight()) {
      return this.noContent()
    }

    switch (result.value.constructor) {
      case DisciplineGroupDoesNotExistError:
      case UserDoesNotExistError:
        return this.notFound(result.value)
      case PermissionDeniedError:
        return this.forbidden(result.value)
      default:
        return this.fail(result.value)
    }
  }
}
