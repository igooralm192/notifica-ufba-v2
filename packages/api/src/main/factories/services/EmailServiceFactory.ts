import { IEmailService } from '@/data/contracts'
import { SendgridEmailService } from '@/infra/services/sendgrid/SendgridEmailService'

import env from '@/main/config/env'

type EmailService = IEmailService.SendMail

export const makeEmailService = (): EmailService => {
  // return new NodemailerEmailService(env.SMTP_HOST, env.SMTP_PORT, env.SMTP_AUTH_USER, env.SMTP_AUTH_PASSWORD)
  return new SendgridEmailService(env.SENDGRID_API_KEY)
}
