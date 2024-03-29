import { IUpdateUserPictureUseCase } from '@/domain/usecases'
import { BaseController } from '@/application/helpers'
import { MissingParamsError } from '@/application/errors'
import { IValidation } from '@/validation/protocols'
import { UserDoesNotExistError } from '@/domain/errors'
import { UploadFileError } from '@/data/errors'

export namespace IUpdateUserPictureController {
  export type Request = BaseController.Request
}

export class UpdateUserPictureController extends BaseController {
  constructor(
    private readonly fileValidation: IValidation,
    private readonly updateUserPictureUseCase: IUpdateUserPictureUseCase,
  ) {
    super()
  }

  async handle(
    request: IUpdateUserPictureController.Request,
  ): Promise<BaseController.Response> {
    const userId = request.context?.userId
    if (!userId) return this.badRequest(new MissingParamsError())

    const validationError = this.fileValidation.validate(request.file)

    if (validationError) {
      return this.badRequest(validationError)
    }

    const result = await this.updateUserPictureUseCase.update(
      { userId },
      { file: request.file },
    )

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case UserDoesNotExistError:
        return this.notFound(result.value)
      case UploadFileError:
        return this.badRequest(result.value)
      default:
        return this.fail(result.value)
    }
  }
}
