import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseUnsubscribeStudent } from './types'

export const useUnsubscribeStudent = (): IUseUnsubscribeStudent.Output => {
  const queryClient = useQueryClient()

  const { isLoading: isUnsubscribing, mutateAsync: unsubscribe } = useMutation(
    async ({ disciplineGroupId }: IUseUnsubscribeStudent.Params) => {
      await api.disciplineGroup.unsubscribeStudent({ disciplineGroupId })

      await queryClient.invalidateQueries([
        'disciplineGroups',
        disciplineGroupId,
      ])
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('disciplineGroups')
        queryClient.invalidateQueries('lastMessages')
      },
      onError: (error: BaseError) => {
        Toast.show({
          type: 'error',
          text1: 'Erro ao inscrever estudante nesta turma.',
          text2: error.message,
        })
      },
    },
  )

  return { isUnsubscribing, unsubscribe }
}
