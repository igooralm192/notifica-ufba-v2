import api from '@/api'
import { useToast } from '@/contexts/toast'
import { getLimitStore } from '@/state/zustand/limit'
import { useMutation } from 'react-query'

import { IUseGeneratePost } from './types'

export const useGeneratePost = (): IUseGeneratePost.Output => {
  const toast = useToast()

  const { isLoading: isGenerating, mutateAsync: generate } = useMutation(
    (input: IUseGeneratePost.Params) => {
      const isAvailable = getLimitStore().getState().available('generatePost')

      if (!isAvailable)
        throw new Error(
          'Você já gerou o máximo de postagens permitidas por usuário.',
        )

      return api.experiment.generatePost(input)
    },
    {
      onSuccess: () => {
        getLimitStore().getState().inc('generatePost')

        const { used, total } = getLimitStore().getState().generatePost

        toast.success(
          `A postagem irá ser gerada em 20 segundos, por favor minimize o aplicativo e aguarde.\n\nSolicitações restantes: ${used}/${total}`,
        )
      },
    },
  )

  return { isGenerating, generate }
}
