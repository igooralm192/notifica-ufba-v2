import { IReadDisciplinesUseCase } from '@/domain/usecases'

import { BaseController } from '@/application/helpers'
import { IListParamsParser } from '@/application/protocols'
import { IDiscipline } from '@shared/entities'

export class ReadDisciplinesController extends BaseController {
  constructor(
    private readonly listParamsParser: IListParamsParser<IDiscipline>,
    private readonly readDisciplinesUseCase: IReadDisciplinesUseCase,
  ) {
    super()
  }

  async handle(
    request: BaseController.Request,
  ): Promise<BaseController.Response> {
    const listParams = this.listParamsParser.parse(request.query)

    const result = await this.readDisciplinesUseCase.run({ ...listParams })

    if (result.isLeft()) {
      return this.fail(result.value)
    }

    return this.ok(result.value)
  }
}
