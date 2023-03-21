import { ISendFeedbackUseCase } from '@/domain/usecases'
import { BaseController } from '@/application/helpers'
import { IValidation } from '@/validation/protocols'

export namespace ISendFeedbackController {
  export type Body = ISendFeedbackUseCase.Body

  export type Request = BaseController.Request<Body>
}

export class SendFeedbackController extends BaseController {
  constructor(
    private readonly validation: IValidation,
    private readonly sendFeedbackUseCase: ISendFeedbackUseCase,
  ) {
    super()
  }

  async handle(
    request: ISendFeedbackController.Request,
  ): Promise<BaseController.Response> {
    const validationError = this.validation.validate(request.body)
    if (validationError) return this.badRequest(validationError)

    const result = await this.sendFeedbackUseCase.sendFeedback({
      body: request.body,
    })

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      default:
        return this.fail(result.value)
    }
  }
}
