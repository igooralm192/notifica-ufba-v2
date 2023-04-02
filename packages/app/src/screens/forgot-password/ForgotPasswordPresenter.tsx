import { IForgotPasswordEndpoint } from '@/api/user/types'
import { useNavigation } from '@/helpers'
import { useForgotPassword } from '@/hooks/api'
import { StackActions } from '@react-navigation/native'

import React, { useContext } from 'react'

export interface ForgotPasswordPresenterContextData {
  isForgotting: boolean
  forgotPassword(input: IForgotPasswordEndpoint.Request): Promise<void>
}

const ForgotPasswordPresenterContext = React.createContext(
  {} as ForgotPasswordPresenterContextData,
)

export const ForgotPasswordPresenter: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigation = useNavigation()
  const { isForgotting, forgotPassword } = useForgotPassword()

  const handleForgotPassword = async ({
    email,
  }: IForgotPasswordEndpoint.Request) => {
    await forgotPassword({ email })

    navigation.dispatch(StackActions.replace('WelcomeScreen'))
    navigation.navigate('LoginScreen')
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
