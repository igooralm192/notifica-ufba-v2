import { DisciplineGroupDoesNotExistError } from '@/domain/errors'
import { IGeneratePostUseCase } from '@/domain/usecases'
import { BaseController } from '@/application/helpers'
import { MissingParamsError } from '@/application/errors'

export namespace IGeneratePostController {
  export type Body = IGeneratePostUseCase.Input

  export type Request = BaseController.Request<Body>
}

export class GeneratePostController extends BaseController {
  constructor(private readonly generatePostUseCase: IGeneratePostUseCase) {
    super()
  }

  async handle(
    request: IGeneratePostController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId

    if (!userId) {
      return this.forbidden(new MissingParamsError())
    }

    const result = await this.generatePostUseCase.generatePost({
      context: { userId },
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
