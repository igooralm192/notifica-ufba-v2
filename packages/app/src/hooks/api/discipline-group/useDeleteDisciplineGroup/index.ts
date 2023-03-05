import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation, useQueryClient } from 'react-query'

import { IUseDeleteDisciplineGroup } from './types'

export const useDeleteDisciplineGroup =
  (): IUseDeleteDisciplineGroup.Output => {
    const queryClient = useQueryClient()
    const toast = useToast()

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

          toast.success('Turma removida com sucesso!')
        },
      },
    )

    return { isDeleting, delete: deleteGroup }
  }
