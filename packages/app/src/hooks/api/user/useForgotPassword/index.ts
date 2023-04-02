import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation } from 'react-query'

import { IUseForgotPassword } from './types'

export const useForgotPassword = (): IUseForgotPassword.Output => {
  const toast = useToast()

  const { isLoading: isForgotting, mutateAsync: forgotPassword } = useMutation(
    (input: IUseForgotPassword.Body) => api.user.forgotPassword(input),
    {
      onSuccess: () => {
        toast.success('E-mail de recuperação de senha enviado com sucesso!')
      },
    },
  )

  return {
    isForgotting,
    forgotPassword: async (input: IUseForgotPassword.Body) =>
      forgotPassword(input),
  }
}
