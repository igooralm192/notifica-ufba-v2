import api from '@/api'
import { useToast } from '@/contexts/toast'
import { getLimitStore } from '@/state/zustand/limit'
import { useMutation } from 'react-query'

import { IUseGenerateMessage } from './types'

export const useGenerateMessage = (): IUseGenerateMessage.Output => {
  const toast = useToast()

  const { isLoading: isGenerating, mutateAsync: generate } = useMutation(
    (input: IUseGenerateMessage.Body) => {
      const isAvailable = getLimitStore().getState().inc('generateMessage')

      if (!isAvailable)
        throw new Error(
          'Você já gerou o máximo de mensagens permitidas por usuário.',
        )

      return api.experiment.generateMessage(input)
    },
    {
      onSuccess: () => {
        const { used, total } = getLimitStore().getState().generateMessage
        toast.success(
          `A mensagem irá ser gerada em 20 segundos, por favor minimize o aplicativo e aguarde.\nSolicitacões restantes: ${used}/${total}`,
        )
      },
    },
  )

  return { isGenerating, generate }
}
