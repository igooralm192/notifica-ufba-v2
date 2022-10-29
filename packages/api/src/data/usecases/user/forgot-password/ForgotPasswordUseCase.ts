import { UserDoesNotExistError } from '@/domain/errors'
import { IForgotPasswordUseCase } from '@/domain/usecases'
import { BaseError } from '@/domain/helpers'
import { Either, left, right } from '@shared/utils'

import {
  IEmailService,
  IGenerateTokenCryptography,
  IUserRepository,
} from '@/data/contracts'

export class ForgotPasswordUseCase implements IForgotPasswordUseCase {
  constructor(
    private readonly findOneUserRepository: IUserRepository.FindOne,
    private readonly generateTokenCryptography: IGenerateTokenCryptography,
    private readonly sendMailEmailService: IEmailService.SendMail,
    private readonly forgotPasswordUrl: string
  ) {}

  async forgotPassword({
    email,
  }: IForgotPasswordUseCase.Input): Promise<Either<BaseError, void>> {
    const user = await this.findOneUserRepository.findOne({ email })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const token = await this.generateTokenCryptography.generate(
      { payload: { userId: user.id } },
      { expiresIn: '1h' },
    )

    const generatedLink = `${this.forgotPasswordUrl}?token=${token}`

    await this.sendMailEmailService.sendMail({
      to: email,
      subject: 'Recuperacão de senha',
      body: `Segue o link para você recuperar sua senha: ${generatedLink}`,
    })

    return right(undefined)
  }
}
