import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseCreateDisciplineGroup } from './types'

export const useCreateDisciplineGroup =
  (): IUseCreateDisciplineGroup.Output => {
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

          Toast.show({
            type: 'success',
            text1: 'Turma criada com sucesso!',
          })
        },
        onError: (error: BaseError) => {
          Toast.show({
            type: 'error',
            text1: `Erro ao criar uma nova turma`,
            text2: error.message,
          })
        },
      },
    )

    return { isCreating, create: createGroup }
  }
