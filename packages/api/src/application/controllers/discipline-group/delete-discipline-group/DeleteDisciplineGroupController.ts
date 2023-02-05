import { IDeleteDisciplineGroupUseCase } from '@/domain/usecases'
import { BaseController } from '@/application/helpers'
import { MissingParamsError } from '@/application/errors'
import { DisciplineGroupDoesNotExistError } from '@/domain/errors'

export namespace IDeleteDisciplineGroupController {
  export type Params = IDeleteDisciplineGroupUseCase.Params

  export type Request = BaseController.Request<any, any, Params>
}

export class DeleteDisciplineGroupController extends BaseController {
  constructor(
    private readonly deleteDisciplineGroupUseCase: IDeleteDisciplineGroupUseCase,
  ) {
    super()
  }

  async handle(
    request: IDeleteDisciplineGroupController.Request,
  ): Promise<BaseController.Response> {
    const disciplineGroupId = request.params?.disciplineGroupId

    if (!disciplineGroupId) {
      return this.badRequest(new MissingParamsError())
    }

    const result = await this.deleteDisciplineGroupUseCase.delete({disciplineGroupId})

    if (result.isRight()) {
      return this.noContent()
    }

    switch (result.value.constructor) {
      case DisciplineGroupDoesNotExistError:
        return this.notFound(result.value)
      default:
        return this.fail(result.value)
    }
  }
}
