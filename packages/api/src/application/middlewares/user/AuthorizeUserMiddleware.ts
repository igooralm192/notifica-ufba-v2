import { IGetUserIdByTokenUseCase } from '@/domain/usecases'
import { BaseMiddleware } from '@/application/helpers'

import {
  ExpiredTokenError,
  InvalidTokenError,
  MissingTokenError,
} from '@/data/errors'

export class AuthorizeUserMiddleware extends BaseMiddleware {
  constructor(
    private readonly getUserIdByTokenUsecase: IGetUserIdByTokenUseCase,
  ) {
    super()
  }

  async handle(
    request: BaseMiddleware.Request,
  ): Promise<BaseMiddleware.Response> {
    const token = this.parseAuthorizationToken(request.headers)

    if (!token) {
      return this.badRequest(new MissingTokenError())
    }

    const result = await this.getUserIdByTokenUsecase.run({ token })

    if (result.isRight()) {
      const { userId } = result.value
      return this.ok({ userId })
    }

    switch (result.value.constructor) {
      case InvalidTokenError:
      case ExpiredTokenError:
        return this.unauthorized(result.value)

      default:
        return this.fail(result.value)
    }
  }

  private parseAuthorizationToken(headers: Record<string, string | undefined>) {
    if (!headers.authorization) return

    const [, token] = headers.authorization.split(' ')

    return token
  }
}
