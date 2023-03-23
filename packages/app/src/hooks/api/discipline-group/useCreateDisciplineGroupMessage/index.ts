import api from '@/api'
import { getLimitStore } from '@/state/zustand/limit'
import { useMutation } from 'react-query'

import { IUseCreateDisciplineGroupMessage } from './types'

export const useCreateDisciplineGroupMessage =
  (): IUseCreateDisciplineGroupMessage.Output => {
    const { isLoading: isCreating, mutateAsync: createMessage } = useMutation(
      ({
        params: { disciplineGroupId, userId, userName },
        body: { message },
      }: IUseCreateDisciplineGroupMessage.Input) => {
        const isAvailable = getLimitStore().getState().inc('createMessage')

        if (!isAvailable)
          throw new Error(
            'Você já enviou o máximo de mensagens permitidas por usuário.',
          )
        
        return api.disciplineGroup.createMessage(
          { disciplineGroupId, userId, userName },
          { message },
        )
      },
    )

    return { isCreating, create: createMessage }
  }
