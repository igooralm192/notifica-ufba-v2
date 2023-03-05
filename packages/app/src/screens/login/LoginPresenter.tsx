import { ILoginEndpoint } from '@/api/user/types'
import { useAuth } from '@/contexts/auth'
import { useLogin } from '@/hooks/api'

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

  const { isLoggingIn, login } = useLogin()

  const handleLogin = async ({ email, password }: ILoginEndpoint.Request) => {
    const { token } = await login({ email, password })

    auth.onTokenChange(token)
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
