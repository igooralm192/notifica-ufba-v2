import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseRemoveDisciplineGroupStudent } from './types'

export const useRemoveDisciplineGroupStudent =
  (): IUseRemoveDisciplineGroupStudent.Output => {
    const queryClient = useQueryClient()

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

          Toast.show({
            type: 'success',
            text1: 'Aluno removido com sucesso!',
          })
        },
        onError: (error: BaseError) => {
          Toast.show({
            type: 'error',
            text1: `Erro ao remover aluno da turma`,
            text2: error.message,
          })
        },
      },
    )

    return { isRemoving, remove: removeStudent }
  }
