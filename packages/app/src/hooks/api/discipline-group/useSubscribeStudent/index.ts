import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation, useQueryClient } from 'react-query'
import { IUseSubscribeStudent } from './types'

export const useSubscribeStudent = (): IUseSubscribeStudent.Output => {
  const queryClient = useQueryClient()
  const toast = useToast()

  const { isLoading: isSubscribing, mutateAsync: subscribe } = useMutation(
    ({ disciplineGroupId }: IUseSubscribeStudent.Params) => {
      return api.disciplineGroup.subscribeStudent({ disciplineGroupId })
    },
    {
      onSuccess: (_, { disciplineGroupId }: IUseSubscribeStudent.Params) => {
        queryClient.invalidateQueries(['disciplineGroups', disciplineGroupId])
        queryClient.invalidateQueries(['disciplineGroups'])
        queryClient.invalidateQueries(['lastMessages'])

        toast.success('Estudante inscrito com sucesso!')
      },
    },
  )

  return { isSubscribing, subscribe }
}
