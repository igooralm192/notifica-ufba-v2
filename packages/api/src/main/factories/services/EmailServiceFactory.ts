import { IEmailService } from '@/data/contracts'
import { NodemailerEmailService } from '@/infra/services/nodemailer/NodemailerEmailService'

import env from '@/main/config/env'

type EmailService = IEmailService.SendMail

export const makeEmailService = (): EmailService => {
  return new NodemailerEmailService(env.SMTP_HOST, env.SMTP_PORT, env.SMTP_AUTH_USER, env.SMTP_AUTH_PASSWORD)
}
