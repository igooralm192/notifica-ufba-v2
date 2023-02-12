import {
  DisciplineGroupDoesNotExistError,
  StudentDoesNotExistError,
  StudentIsNotSubscribedError,
} from '@/domain/errors'
import { IUnsubscribeStudentUseCase } from '@/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'

export namespace IUnsubscribeStudentController {
  export type Params = {
    disciplineGroupId?: string
  }

  export type Request = BaseController.Request<Body, any, Params>
}

export class UnsubscribeStudentController extends BaseController {
  constructor(
    private readonly unsubscribeStudent: IUnsubscribeStudentUseCase,
  ) {
    super()
  }

  async handle(
    request: IUnsubscribeStudentController.Request,
  ): Promise<BaseController.Response> {
    const studentId = request.context?.studentId
    const disciplineGroupId = request.params?.disciplineGroupId

    if (!studentId) {
      return this.forbidden(new MissingParamsError())
    }

    if (!disciplineGroupId) {
      return this.badRequest(new MissingParamsError())
    }

    const result = await this.unsubscribeStudent.unsubscribe({
      context: { studentId },
      params: {disciplineGroupId}
    })

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case DisciplineGroupDoesNotExistError:
      case StudentDoesNotExistError:
        return this.notFound(result.value)

      case StudentIsNotSubscribedError:
        return this.unprocessable(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
