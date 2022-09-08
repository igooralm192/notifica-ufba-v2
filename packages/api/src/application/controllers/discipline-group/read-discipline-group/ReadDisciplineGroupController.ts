import { DisciplineGroupDoesNotExistError } from '@/domain/errors'
import { IReadDisciplineGroupUseCase } from '@/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'

export namespace IReadDisciplineGroupController {
  export type Params = {
    disciplineGroupId?: string
  }

  export type Request = BaseController.Request<any, any, Params>
}

export class ReadDisciplineGroupController extends BaseController {
  constructor(
    private readonly readDisciplineGroupUseCase: IReadDisciplineGroupUseCase,
  ) {
    super()
  }

  async handle(
    request: IReadDisciplineGroupController.Request,
  ): Promise<BaseController.Response> {
    const disciplineGroupId = request.params?.disciplineGroupId

    if (!disciplineGroupId) {
      return this.badRequest(new MissingParamsError())
    }

    const result = await this.readDisciplineGroupUseCase.run({
      id: { disciplineGroupId },
    })

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case DisciplineGroupDoesNotExistError:
        return this.notFound(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
