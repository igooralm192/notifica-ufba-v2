import { IForgotPasswordEndpoint } from '@/api/user/types'

export namespace IUseForgotPassword {
  export type Body = {
    email: string
  }

  export type Output = {
    isForgotting: boolean
    // forgotPassword: (input: Body) => Promise<IForgotPasswordEndpoint.Response>
    forgotPassword: (input: Body) => Promise<void>
  }
}
