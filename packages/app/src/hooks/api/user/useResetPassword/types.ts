import { IResetPasswordEndpoint } from '@/api/user/types'

export namespace IUseResetPassword {
  export type Body = {
    newPassword: string
    token: string
  }

  export type Output = {
    isResetting: boolean
    resetPassword: (input: Body) => Promise<void>
  }
}
