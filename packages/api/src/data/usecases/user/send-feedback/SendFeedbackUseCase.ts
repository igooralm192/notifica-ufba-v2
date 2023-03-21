import { Either, right } from '@shared/utils'

import { BaseError } from '@/domain/helpers'
import { ISendFeedbackUseCase } from '@/domain/usecases'

import { IEmailService } from '@/data/contracts'

export class SendFeedbackUseCase implements ISendFeedbackUseCase {
  constructor(private readonly sendMailEmailService: IEmailService.SendMail) {}

  async sendFeedback({
    body: { feedback },
  }: ISendFeedbackUseCase.Input): Promise<
    Either<BaseError, ISendFeedbackUseCase.Output>
  > {
    await this.sendMailEmailService.sendMail({
      to: 'igor.nascimento@ufba.br',
      subject: `Feedback enviado pelo APP`,
      body: `<h2>Notifica UFBA</h2><b>Feedback</b><br/>${feedback}<br/><br/>Enviado às ${new Date().toLocaleDateString()}`,
    })

    return right(undefined)
  }
}
