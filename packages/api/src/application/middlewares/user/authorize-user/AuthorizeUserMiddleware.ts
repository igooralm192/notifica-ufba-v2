import {
  IGetUserByIdUseCase,
  IGetUserIdByTokenUseCase,
} from '@/domain/usecases'
import { BaseMiddleware } from '@/application/helpers'

import {
  ExpiredTokenError,
  InvalidTokenError,
  MissingTokenError,
} from '@/data/errors'
import { Request, Response } from '@/application/helpers/types'
import { UserDoesNotExistError } from '@/domain/errors'

export type AuthorizeUserRequest = Request<
  any,
  any,
  any,
  any,
  { authorization?: string }
>

export type AuthorizeUserResponse = Response<{ userId: string }>

export class AuthorizeUserMiddleware extends BaseMiddleware {
  constructor(
    private readonly getUserIdByTokenUseCase: IGetUserIdByTokenUseCase,
    private readonly getUserByIdUseCase: IGetUserByIdUseCase,
  ) {
    super()
  }

  async handle(request: AuthorizeUserRequest): Promise<AuthorizeUserResponse> {
    const token = this.parseAuthorizationToken(request.headers ?? {})

    if (!token) {
      return this.badRequest(new MissingTokenError())
    }

    const result = await this.getUserIdByTokenUseCase.run({ token })

    if (result.isLeft()) {
      switch (result.value.constructor) {
        case InvalidTokenError:
        case ExpiredTokenError:
          return this.unauthorized(result.value)

        default:
          return this.fail(result.value)
      }
    }

    const { userId } = result.value

    const userResult = await this.getUserByIdUseCase.run({ userId })

    if (userResult.isLeft()) {
      switch (userResult.value.constructor) {
        case UserDoesNotExistError:
          return this.unauthorized(userResult.value)

        default:
          return this.fail(userResult.value)
      }
    }

    return this.ok({ userId })
  }

  private parseAuthorizationToken(headers: Record<string, string | undefined>) {
    if (!headers.authorization) return

    const [, token] = headers.authorization.split(' ')

    return token
  }
}
