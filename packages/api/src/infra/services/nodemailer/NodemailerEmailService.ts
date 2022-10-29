import { IEmailService } from '@/data/contracts'
import * as nodemailer from 'nodemailer'

export class NodemailerEmailService implements IEmailService.SendMail {
  private client: nodemailer.Transporter

  constructor(
    host: string,
    port: number,
    authUser: string,
    authPassword: string,
  ) {
    this.client = nodemailer.createTransport({
      host,
      port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: authUser,
        pass: authPassword,
      },
      tls: { rejectUnauthorized: false },
    })
  }

  async sendMail({
    to,
    subject,
    body,
  }: IEmailService.SendMail.Input): Promise<void> {
    const response = await this.client.sendMail({
      from: 'NotificaUFBA <notifica-ufba@ufba.br>',
      to,
      subject,
      text: body,
      html: body,
    })

    console.log('Preview URL', nodemailer.getTestMessageUrl(response))
  }
}
