export namespace IEmailService {
  export namespace SendMail {
    export interface Input {
      to: string
      subject: string
      body: string
    }
  }

  export interface SendMail {
    sendMail: (input: SendMail.Input) => Promise<void>
  }
}
