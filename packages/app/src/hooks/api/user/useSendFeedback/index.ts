import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation } from 'react-query'

import { IUseSendFeedback } from './types'

export const useSendFeedback = (): IUseSendFeedback.Output => {
  const toast = useToast()

  const { isLoading: isSending, mutate: sendFeedback } = useMutation(
    (input: IUseSendFeedback.Body) => api.user.sendFeedback(input),
    {
      onSuccess: () => {
        toast.success('Feedback enviado com sucesso!')
      },
    },
  )

  return {
    isSending,
    sendFeedback: async (input: IUseSendFeedback.Body) => sendFeedback(input),
  }
}
