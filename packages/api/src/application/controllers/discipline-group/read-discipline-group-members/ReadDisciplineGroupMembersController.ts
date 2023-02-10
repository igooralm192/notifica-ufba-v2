import { DisciplineGroupDoesNotExistError } from '@/domain/errors'
import { IReadDisciplineGroupMembersUseCase } from '@/domain/usecases'
import { BaseController } from '@/application/helpers'
import { MissingParamsError } from '@/application/errors'

export namespace IReadDisciplineGroupMembersController {
  export type Params = IReadDisciplineGroupMembersUseCase.Params

  export type Request = BaseController.Request<any, any, Params>
}

export class ReadDisciplineGroupMembersController extends BaseController {
  constructor(
    private readonly readDisciplineGroupMembersUseCase: IReadDisciplineGroupMembersUseCase,
  ) {
    super()
  }

  async handle(
    request: IReadDisciplineGroupMembersController.Request,
  ): Promise<BaseController.Response> {
    const disciplineGroupId = request.params?.disciplineGroupId

    if (!disciplineGroupId) {
      return this.badRequest(new MissingParamsError())
    }

    const result = await this.readDisciplineGroupMembersUseCase.readMembers({
      disciplineGroupId,
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
