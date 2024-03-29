import { FullLoading } from '@/components/FullLoading'
import { useToast } from '@/contexts/toast'
import { useNavigation } from '@/helpers'
import { useResetPassword } from '@/hooks/api'
import { AppNavigation } from '@/types/navigation'

import { StackActions } from '@react-navigation/routers'
import { StackScreenProps } from '@react-navigation/stack'
import jwt_decode from 'jwt-decode'
import React, { useContext, useEffect, useState } from 'react'

export interface ResetPasswordPresenterContextData {
  isResetting: boolean
  resetPassword(newPassword: string): Promise<void>
}

interface ResetPasswordPresenterProps extends React.PropsWithChildren {
  token?: string
}

interface TokenPayload {
  userId?: string
}

const ResetPasswordPresenterContext = React.createContext(
  {} as ResetPasswordPresenterContextData,
)

const decodeTokenPayload = (token: string | undefined): TokenPayload => {
  if (!token) return {}

  try {
    const { userId } = jwt_decode<TokenPayload>(token)

    return { userId }
  } catch {
    return {}
  }
}

export const ResetPasswordPresenter: React.FC<ResetPasswordPresenterProps> = ({
  token,
  children,
}) => {
  const navigation = useNavigation()
  const toast = useToast()
  const { isResetting, resetPassword } = useResetPassword()

  const [ready, setReady] = useState(false)

  const handleResetPassword = async (newPassword: string) => {
    if (!token) return

    await resetPassword({ newPassword, token })

    navigation.dispatch(StackActions.replace('WelcomeScreen'))
    navigation.navigate('LoginScreen')
  }

  useEffect(() => {
    const { userId } = decodeTokenPayload(token)

    if (!userId) {
      toast.error(
        'Não foi possível obter os dados do usuário a partir do token enviado, tente novamente com um token válido.',
      )

      navigation.dispatch(StackActions.replace('WelcomeScreen'))

      return
    }

    setReady(true)
  }, [])

  if (!ready) return <FullLoading />

  return (
    <ResetPasswordPresenterContext.Provider
      value={{
        isResetting,
        resetPassword: handleResetPassword,
      }}
    >
      {children}
    </ResetPasswordPresenterContext.Provider>
  )
}

export const withResetPasswordPresenter = (Component: React.FC) => {
  return ({
    route,
  }: StackScreenProps<AppNavigation, 'ResetPasswordScreen'>) => {
    return (
    <ResetPasswordPresenter token={route.params.token}>
      <Component />
    </ResetPasswordPresenter>
  )
  }
}

export const useResetPasswordPresenter = () =>
  useContext(ResetPasswordPresenterContext)
