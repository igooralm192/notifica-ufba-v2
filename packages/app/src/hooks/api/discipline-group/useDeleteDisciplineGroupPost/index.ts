import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseDeleteDisciplineGroupPost } from './types'

export const useDeleteDisciplineGroupPost =
  (): IUseDeleteDisciplineGroupPost.Output => {
    const queryClient = useQueryClient()

    const { isLoading: isDeleting, mutateAsync: deletePost } = useMutation(
      ({ params }: IUseDeleteDisciplineGroupPost.Input) => {
        const { disciplineGroupId, disciplineGroupPostId } = params

        return api.disciplineGroup.deleteDisciplineGroupPost({
          disciplineGroupId,
          disciplineGroupPostId,
        })
      },
      {
        onSuccess: (_, { params: { disciplineGroupId } }) => {
          queryClient.invalidateQueries([
            'disciplineGroupPosts',
            disciplineGroupId,
          ])

          Toast.show({
            type: 'success',
            text1: 'Postagem removida com sucesso!',
          })
        },
        onError: (error: BaseError) => {
          Toast.show({
            type: 'error',
            text1: `Erro ao remover postagem`,
            text2: error.message,
          })
        },
      },
    )

    return { isDeleting, delete: deletePost }
  }
