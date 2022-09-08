import { IReadLastMessagesUseCase } from '@/domain/usecases'

import { MissingParamsError } from '@/application/errors'
import { BaseController } from '@/application/helpers'
import { IListParamsParser } from '@/application/protocols'

export namespace IReadLastMessagesController {
  export type Request = BaseController.Request
}

export class ReadLastMessagesController extends BaseController {
  constructor(
    private readonly listParamsParser: IListParamsParser,
    private readonly readLastMessagesUseCase: IReadLastMessagesUseCase,
  ) {
    super()
  }

  async handle(
    request: IReadLastMessagesController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    const listParams = this.listParamsParser.parse(request.query)

    const result = await this.readLastMessagesUseCase.run({
      userId,
      listInput: listParams,
    })

    if (result.isLeft()) {
      return this.fail(result.value)
    }

    const { results, total } = result.value

    return this.ok({ results, total })
  }
}
