import { ISendFeedbackEndpoint } from '@/api/user/types'

export namespace IUseSendFeedback {
  export type Body = ISendFeedbackEndpoint.Request

  export type Output = {
    isSending: boolean
    sendFeedback: (input: Body) => Promise<void>
  }
}
