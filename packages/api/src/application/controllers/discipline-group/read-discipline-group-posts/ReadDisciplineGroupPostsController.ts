import { IDisciplineGroupPost } from '@shared/entities'
import { IReadDisciplineGroupPostsUseCase } from '@/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'
import { IListParamsParser } from '@/application/protocols'

export namespace IReadDisciplineGroupPostsController {
  export type Params = {
    disciplineGroupId?: string
  }

  export type Request = BaseController.Request<Body, any, Params>
}

export class ReadDisciplineGroupPostsController extends BaseController {
  constructor(
    private readonly listParamsParser: IListParamsParser<IDisciplineGroupPost>,
    private readonly readDisciplineGroupPostsUseCase: IReadDisciplineGroupPostsUseCase,
  ) {
    super()
  }

  async handle(
    request: IReadDisciplineGroupPostsController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    const disciplineGroupId = request.params?.disciplineGroupId

    if (!disciplineGroupId) {
      return this.badRequest(new MissingParamsError())
    }

    const listParams = this.listParamsParser.parse(request.query)

    const result = await this.readDisciplineGroupPostsUseCase.run({
      disciplineGroupId,
      listInput: listParams,
    })

    if (result.isLeft()) {
      return this.fail(result.value)
    }

    return this.ok(result.value)
  }
}
