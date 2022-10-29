import { IForgotPasswordEndpoint } from '@/api/user/types'
import { useForgotPassword } from '@/hooks/api'

import React, { useContext } from 'react'

export interface ForgotPasswordPresenterContextData {
  isForgotting: boolean
  forgotPassword(input: IForgotPasswordEndpoint.Request): Promise<void>
}

const ForgotPasswordPresenterContext = React.createContext(
  {} as ForgotPasswordPresenterContextData,
)

export const ForgotPasswordPresenter: React.FC = ({ children }) => {
  const { isForgotting, forgotPassword } = useForgotPassword()

  const handleForgotPassword = async ({
    email,
  }: IForgotPasswordEndpoint.Request) => {
    await forgotPassword({ email })
  }

  return (
    <ForgotPasswordPresenterContext.Provider
      value={{
        isForgotting,
        forgotPassword: handleForgotPassword,
      }}
    >
      {children}
    </ForgotPasswordPresenterContext.Provider>
  )
}

export const withForgotPasswordPresenter = (Component: React.FC) => {
  return (props: any) => (
    <ForgotPasswordPresenter>
      <Component {...props} />
    </ForgotPasswordPresenter>
  )
}

export const useForgotPasswordPresenter = () =>
  useContext(ForgotPasswordPresenterContext)
