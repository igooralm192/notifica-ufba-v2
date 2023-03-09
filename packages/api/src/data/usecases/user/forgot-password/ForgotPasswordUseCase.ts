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
    private readonly forgotPasswordUrl: { default: string; expo: string },
  ) {}

  async forgotPassword({
    body,
    query,
  }: IForgotPasswordUseCase.Input): Promise<Either<BaseError, void>> {
    const { email } = body
    const { expo = false } = query

    const user = await this.findOneUserRepository.findOne({ email })

    if (!user) {
      return left(new UserDoesNotExistError())
    }

    const token = await this.generateTokenCryptography.generate(
      { payload: { userId: user.id } },
      { expiresIn: '1h' },
    )

    const forgotPasswordUrl = expo ? this.forgotPasswordUrl.expo : this.forgotPasswordUrl.default
    const generatedLink = forgotPasswordUrl.replace(':token', token)

    console.log({ forgotPasswordUrl })

    await this.sendMailEmailService.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      body: `Notifica UFBA<br/><br/>Clique neste <a href="${generatedLink}">link</a> para recuperar sua senha.`,
    })

    return right(undefined)
  }
}
