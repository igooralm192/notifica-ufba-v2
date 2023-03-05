import { ILoginEndpoint } from '@/api/user/types'
import { useAuth } from '@/contexts/auth'
import { useToast } from '@/contexts/toast'
import { useLogin } from '@/hooks/api'
import { assertIsError } from '@/utils/error'

import React, { useContext } from 'react'

export interface LoginPresenterContextData {
  isLoggingIn: boolean
  login(input: ILoginEndpoint.Request): Promise<void>
}

const LoginPresenterContext = React.createContext(
  {} as LoginPresenterContextData,
)

export const LoginPresenter: React.FC = ({ children }) => {
  const auth = useAuth()
  const toast = useToast()

  const { isLoggingIn, login } = useLogin()

  const handleLogin = async ({ email, password }: ILoginEndpoint.Request) => {
    try {
      const { token } = await login({ email, password })

      auth.onTokenChange(token)
    } catch (error) {
      assertIsError(error)

      toast.error(error.message)
    }
  }

  return (
    <LoginPresenterContext.Provider value={{ isLoggingIn, login: handleLogin }}>
      {children}
    </LoginPresenterContext.Provider>
  )
}

export const withLoginPresenter = (Component: React.FC) => {
  return (props: any) => (
    <LoginPresenter>
      <Component {...props} />
    </LoginPresenter>
  )
}

export const useLoginPresenter = () => useContext(LoginPresenterContext)
