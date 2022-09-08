import { IDisciplineGroup } from '@shared/entities'
import { IReadDisciplineGroupsUseCase } from '@/domain/usecases'

import { BaseController } from '@/application/helpers'
import { IListParamsParser } from '@/application/protocols'
import { MissingParamsError } from '@/application/errors'

export namespace IReadDisciplineGroupsController {
  export type Request = BaseController.Request
}

export class ReadDisciplineGroupsController extends BaseController {
  constructor(
    private readonly listParamsParser: IListParamsParser<IDisciplineGroup>,
    private readonly readDisciplineGroupsUseCase: IReadDisciplineGroupsUseCase,
  ) {
    super()
  }

  async handle(
    request: IReadDisciplineGroupsController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    const listParams = this.listParamsParser.parse(request.query)

    const result = await this.readDisciplineGroupsUseCase.run({
      listInput: listParams,
    })

    if (result.isLeft()) {
      return this.fail(result.value)
    }

    return this.ok(result.value)
  }
}
