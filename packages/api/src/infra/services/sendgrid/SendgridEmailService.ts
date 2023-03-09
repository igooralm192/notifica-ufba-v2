import { IEmailService } from '@/data/contracts'
import sendgrid, {ClientResponse} from '@sendgrid/mail'

export class SendgridEmailService implements IEmailService.SendMail {
  constructor(
    API_KEY: string
  ) {
    sendgrid.setApiKey(API_KEY)
    console.log({API_KEY})
  }

  async sendMail({
    to,
    subject,
    body,
  }: IEmailService.SendMail.Input): Promise<void> {
    try {
      await sendgrid.send({
        from: 'igor.nascimento@ufba.br',
        to,
        subject,
        html: body,
      })
    } catch (error) {
      console.error(error.response.body)
    }
  }
}
