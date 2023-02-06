import {
  DisciplineGroupDoesNotExistError,
  DisciplineGroupPostDoesNotExistError,
  PostDoesNotBelongToThisGroupError,
} from '@/domain/errors'
import { IDeleteDisciplineGroupPostUseCase } from '@/domain/usecases'
import { BaseController } from '@/application/helpers'
import { MissingParamsError } from '@/application/errors'

export namespace IDeleteDisciplineGroupPostController {
  export type Params = IDeleteDisciplineGroupPostUseCase.Params

  export type Request = BaseController.Request<any, any, Params>
}

export class DeleteDisciplineGroupPostController extends BaseController {
  constructor(
    private readonly deleteDisciplineGroupPostUseCase: IDeleteDisciplineGroupPostUseCase,
  ) {
    super()
  }

  async handle(
    request: IDeleteDisciplineGroupPostController.Request,
  ): Promise<BaseController.Response> {
    const disciplineGroupId = request.params?.disciplineGroupId
    const disciplineGroupPostId = request.params?.disciplineGroupPostId

    if (!disciplineGroupId || !disciplineGroupPostId) {
      return this.badRequest(new MissingParamsError())
    }

    const result = await this.deleteDisciplineGroupPostUseCase.delete({
      disciplineGroupId,
      disciplineGroupPostId,
    })

    if (result.isRight()) {
      return this.noContent()
    }

    switch (result.value.constructor) {
      case DisciplineGroupDoesNotExistError:
      case DisciplineGroupPostDoesNotExistError:
        return this.notFound(result.value)
      case PostDoesNotBelongToThisGroupError:
        return this.unprocessable(result.value)
      default:
        return this.fail(result.value)
    }
  }
}
