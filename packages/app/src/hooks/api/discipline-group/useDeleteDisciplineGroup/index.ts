import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseDeleteDisciplineGroup } from './types'

export const useDeleteDisciplineGroup =
  (): IUseDeleteDisciplineGroup.Output => {
    const queryClient = useQueryClient()

    const { isLoading: isDeleting, mutateAsync: deleteGroup } = useMutation(
      ({ params }: IUseDeleteDisciplineGroup.Input) => {
        const { disciplineGroupId } = params

        return api.disciplineGroup.deleteDisciplineGroup({ disciplineGroupId })
      },
      {
        onSuccess: _ => {
          queryClient.invalidateQueries(['disciplineGroups'])
          queryClient.invalidateQueries(['disciplines'])
          queryClient.invalidateQueries(['lastMessages'])

          Toast.show({
            type: 'success',
            text1: 'Turma removida com sucesso!',
          })
        },
        onError: (error: BaseError) => {
          Toast.show({
            type: 'error',
            text1: `Erro ao remover turma`,
            text2: error.message,
          })
        },
      },
    )

    return { isDeleting, delete: deleteGroup }
  }
