import { ILoginEndpoint } from '@/api/user/types'

export namespace IUseLogin {
  export type Body = {
    email: string
    password: string
  }

  export type Output = {
    isLoggingIn: boolean
    login: (input: Body) => Promise<ILoginEndpoint.Response>
  }
}
