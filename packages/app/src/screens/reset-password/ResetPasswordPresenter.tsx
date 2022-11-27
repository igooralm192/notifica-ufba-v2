import { FullLoading } from '@/components/FullLoading'
import { useNavigation } from '@/helpers'
import { useResetPassword } from '@/hooks/api'
import { AppNavigation } from '@/types/navigation'
import { StackActions } from '@react-navigation/routers'
import { StackScreenProps } from '@react-navigation/stack'

import jwt_decode from 'jwt-decode'
import React, { useContext } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Toast from 'react-native-toast-message'

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
  const { isResetting, resetPassword } = useResetPassword()

  const [ready, setReady] = useState(false)

  const handleResetPassword = async (newPassword: string) => {
    if (!token) return

    await resetPassword({ newPassword, token })

    navigation.dispatch(StackActions.replace('LoginScreen'))
  }

  useEffect(() => {
    const { userId } = decodeTokenPayload(token)

    if (!userId) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao decodificar token',
        text2: 'Não foi possível obter os dados do usuário.',
      })

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
