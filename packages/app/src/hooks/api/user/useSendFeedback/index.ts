import api from '@/api'
import { useToast } from '@/contexts/toast'
import { getLimitStore } from '@/state/zustand/limit'
import { useMutation } from 'react-query'

import { IUseSendFeedback } from './types'

export const useSendFeedback = (): IUseSendFeedback.Output => {
  const toast = useToast()

  const { isLoading: isSending, mutate: sendFeedback } = useMutation(
    async (input: IUseSendFeedback.Body) => {
      const isAvailable = getLimitStore().getState().inc('sendFeedback')

      if (!isAvailable)
        throw new Error(
          'Você já enviou o máximo de feedbacks permitidos por usuário.',
        )

      return api.user.sendFeedback(input)
    },
    {
      onSuccess: () => {
        const { used, total } = getLimitStore().getState().sendFeedback

        toast.success(
          `Feedback enviado com sucesso!\n\nSolicitações restantes: ${used}/${total}`,
        )
      },
    },
  )

  return {
    isSending,
    sendFeedback: async (input: IUseSendFeedback.Body) => sendFeedback(input),
  }
}
