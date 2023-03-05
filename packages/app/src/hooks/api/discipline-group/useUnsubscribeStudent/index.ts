import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation, useQueryClient } from 'react-query'

import { IUseUnsubscribeStudent } from './types'

export const useUnsubscribeStudent = (): IUseUnsubscribeStudent.Output => {
  const queryClient = useQueryClient()
  const toast = useToast()

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
        queryClient.invalidateQueries(['disciplineGroups'])
        queryClient.invalidateQueries(['lastMessages'])

        toast.success('Estudante desinscrito com sucesso!')
      },
    },
  )

  return { isUnsubscribing, unsubscribe }
}
