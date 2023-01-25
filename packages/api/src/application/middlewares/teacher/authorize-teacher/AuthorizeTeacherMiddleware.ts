import { MissingParamsError } from '@/application/errors'
import { BaseMiddleware } from '@/application/helpers'
import { Request, Response } from '@/application/helpers/types'
import { ITeacherRepository } from '@/data/contracts'
import { PermissionDeniedError } from '@/domain/errors'

export type AuthorizeTeacherRequest = Request<
  any,
  any,
  any,
  { userId: string },
  any
>

export type AuthorizeTeacherResponse = Response<{
  userId: string
  teacherId: string
}>

export class AuthorizeTeacherMiddleware extends BaseMiddleware {
  constructor(
    private readonly findOneTeacherRepository: ITeacherRepository.FindOne,
  ) {
    super()
  }

  async handle(
    request: AuthorizeTeacherRequest,
  ): Promise<AuthorizeTeacherResponse> {
    const userId = request.context?.userId

    if (!userId) return this.unauthorized(new MissingParamsError())

    // TODO: Isolate to an usecase
    const teacher = await this.findOneTeacherRepository.findOne({
      where: { userId },
    })

    if (!teacher) return this.forbidden(new PermissionDeniedError())

    return this.ok<AuthorizeTeacherResponse['body']>({
      userId,
      teacherId: teacher.id,
    })
  }
}
