import {
  DisciplineGroupDoesNotExistError,
  StudentDoesNotExistError,
  StudentIsNotSubscribedError,
  TeacherDoesNotBelongToThisGroupError,
  TeacherDoesNotExistError,
} from '@/domain/errors'
import { IRemoveDisciplineGroupStudentUseCase } from '@/domain/usecases'
import { BaseController } from '@/application/helpers'
import { MissingParamsError } from '@/application/errors'

export namespace IRemoveDisciplineGroupStudentController {
  export type Params = IRemoveDisciplineGroupStudentUseCase.Params

  export type Request = BaseController.Request<any, any, Params>
}

export class RemoveDisciplineGroupStudentController extends BaseController {
  constructor(
    private readonly removeDisciplineGroupStudentUseCase: IRemoveDisciplineGroupStudentUseCase,
  ) {
    super()
  }

  async handle(
    request: IRemoveDisciplineGroupStudentController.Request,
  ): Promise<BaseController.Response> {
    const teacherId = request.context?.teacherId
    const disciplineGroupId = request.params?.disciplineGroupId
    const studentId = request.params?.studentId

    if (!teacherId) {
      return this.forbidden(new MissingParamsError())
    }

    if (!disciplineGroupId || !studentId) {
      return this.badRequest(new MissingParamsError())
    }
    const result = await this.removeDisciplineGroupStudentUseCase.removeStudent(
      {
        context: { teacherId },
        params: { disciplineGroupId, studentId },
      },
    )

    if (result.isRight()) {
      return this.ok(result.value)
    }

    switch (result.value.constructor) {
      case TeacherDoesNotExistError:
      case DisciplineGroupDoesNotExistError:
      case StudentDoesNotExistError:
        return this.notFound(result.value)

      case StudentIsNotSubscribedError:
      case TeacherDoesNotBelongToThisGroupError:
        return this.unprocessable(result.value)

      default:
        return this.fail(result.value)
    }
  }
}
