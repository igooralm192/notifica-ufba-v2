import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation } from 'react-query'

import { IUseResetPassword } from './types'

export const useResetPassword = (): IUseResetPassword.Output => {
  const toast = useToast()

  const { isLoading: isResetting, mutate: resetPassword } = useMutation(
    (input: IUseResetPassword.Body) => api.user.resetPassword(input),
    {
      onSuccess: () => {
        toast.success('Senha resetada com sucesso!')
      },
    },
  )

  return {
    isResetting,
    resetPassword: async (input: IUseResetPassword.Body) =>
      resetPassword(input),
  }
}
