import api from '@/api'
import { BaseError } from '@/helpers'
import { useMutation, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'
import { IUseSubscribeStudent } from './types'

export const useSubscribeStudent = (): IUseSubscribeStudent.Output => {
  const queryClient = useQueryClient()

  const { isLoading: isSubscribing, mutateAsync: subscribe } =
    useMutation(
      ({ disciplineGroupId }: IUseSubscribeStudent.Params) => {
        return api.disciplineGroup.subscribeStudent({ disciplineGroupId })
      },
      {
        onSuccess: (_, { disciplineGroupId }: IUseSubscribeStudent.Params) => {
          queryClient.invalidateQueries(['disciplineGroups', disciplineGroupId])
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

  return { isSubscribing, subscribe }
}
