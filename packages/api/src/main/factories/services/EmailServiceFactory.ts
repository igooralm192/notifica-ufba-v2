import { IEmailService } from '@/data/contracts'
import { NodemailerEmailService } from '@/infra/services/nodemailer/NodemailerEmailService'
import { SendgridEmailService } from '@/infra/services/sendgrid/SendgridEmailService'

import env from '@/main/config/env'

type EmailService = IEmailService.SendMail

const emailServiceMap = {
  development: () => {
    return new NodemailerEmailService(
      env.SMTP_HOST,
      env.SMTP_PORT,
      env.SMTP_AUTH_USER,
      env.SMTP_AUTH_PASSWORD,
    )
  },
  production: () => {
   return new SendgridEmailService(env.SENDGRID_API_KEY)
  },
}

export const makeEmailService = (): EmailService => {
  return emailServiceMap[env.NODE_ENV]()
}
