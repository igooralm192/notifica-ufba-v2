import api from '@/api'
import { useToast } from '@/contexts/toast'

import { useMutation, useQueryClient } from 'react-query'

import { IUseCreateDisciplineGroup } from './types'

export const useCreateDisciplineGroup =
  (): IUseCreateDisciplineGroup.Output => {
    const toast = useToast()
    const queryClient = useQueryClient()

    const { isLoading: isCreating, mutateAsync: createGroup } = useMutation(
      ({
        disciplineId,
        ...body
      }: IUseCreateDisciplineGroup.Params & IUseCreateDisciplineGroup.Body) => {
        return api.discipline.createGroup({ disciplineId }, body)
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['disciplineGroups'])

          toast.success('Turma criada com sucesso!')
        },
      },
    )

    return { isCreating, create: createGroup }
  }
