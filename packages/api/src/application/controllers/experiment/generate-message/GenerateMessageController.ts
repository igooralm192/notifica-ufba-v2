import { DisciplineGroupDoesNotExistError } from '@/domain/errors'
import { IGenerateMessageUseCase } from '@/domain/usecases'
import { BaseController } from '@/application/helpers'
import { MissingParamsError } from '@/application/errors'

export namespace IGenerateMessageController {
  export type Params = IGenerateMessageUseCase.Params

  export type Request = BaseController.Request<any, any, Params>
}

export class GenerateMessageController extends BaseController {
  constructor(private readonly generateMessageUseCase: IGenerateMessageUseCase) {
    super()
  }

  async handle(
    request: IGenerateMessageController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    const disciplineGroupId = request.params?.disciplineGroupId

    if (!disciplineGroupId) {
      return this.forbidden(new MissingParamsError())
    }

    const result = await this.generateMessageUseCase.generateMessage({
      context: { userId },
      params: { disciplineGroupId },
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
