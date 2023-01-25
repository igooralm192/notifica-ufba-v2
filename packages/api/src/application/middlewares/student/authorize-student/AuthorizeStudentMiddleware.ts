import { MissingParamsError } from '@/application/errors'
import { BaseMiddleware } from '@/application/helpers'
import { Request, Response } from '@/application/helpers/types'
import { IFindOneStudentRepository } from '@/data/contracts'
import { PermissionDeniedError } from '@/domain/errors'

export type AuthorizeStudentRequest = Request<
  any,
  any,
  any,
  { userId: string },
  any
>

export type AuthorizeStudentResponse = Response<{
  userId: string
  studentId: string
}>

export class AuthorizeStudentMiddleware extends BaseMiddleware {
  constructor(
    private readonly findOneStudentRepository: IFindOneStudentRepository,
  ) {
    super()
  }

  async handle(
    request: AuthorizeStudentRequest,
  ): Promise<AuthorizeStudentResponse> {
    const userId = request.context?.userId

    if (!userId) return this.unauthorized(new MissingParamsError())

    // TODO: Isolate to an usecase
    const student = await this.findOneStudentRepository.findOne({
      userId,
    })

    if (!student) return this.forbidden(new PermissionDeniedError())

    return this.ok<AuthorizeStudentResponse['body']>({
      userId,
      studentId: student.id,
    })
  }
}
