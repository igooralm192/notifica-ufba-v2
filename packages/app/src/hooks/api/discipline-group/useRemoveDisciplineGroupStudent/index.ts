import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation, useQueryClient } from 'react-query'

import { IUseRemoveDisciplineGroupStudent } from './types'

export const useRemoveDisciplineGroupStudent =
  (): IUseRemoveDisciplineGroupStudent.Output => {
    const queryClient = useQueryClient()
    const toast = useToast()

    const { isLoading: isRemoving, mutateAsync: removeStudent } = useMutation(
      ({ params }: IUseRemoveDisciplineGroupStudent.Input) => {
        const { disciplineGroupId, studentId } = params

        return api.disciplineGroup.removeDisciplineGroupStudent({
          disciplineGroupId,
          studentId,
        })
      },
      {
        onSuccess: (_, { params: { disciplineGroupId } }) => {
          queryClient.invalidateQueries([
            'disciplineGroupMembers',
            disciplineGroupId,
          ])

          toast.success('Aluno removido com sucesso!')
        },
      },
    )

    return { isRemoving, remove: removeStudent }
  }
