import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { IUseResetPassword } from './types'

export const useResetPassword = (): IUseResetPassword.Output => {
  const { isLoading: isResetting, mutate: resetPassword } = useMutation(
    (input: IUseResetPassword.Body) => api.user.resetPassword(input),
    {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: 'Senha resetada com sucesso!'
        })
      },
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: `Erro ao resetar senha`,
          text2: error.message,
        })
      },
    },
  )

  return {
    isResetting,
    resetPassword: async (input: IUseResetPassword.Body) => resetPassword(input),
  }
}
