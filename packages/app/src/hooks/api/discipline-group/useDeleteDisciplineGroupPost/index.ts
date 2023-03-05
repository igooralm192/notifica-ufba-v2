import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

import { IUseDeleteDisciplineGroupPost } from './types'
import { useToast } from '@/contexts/toast'

export const useDeleteDisciplineGroupPost =
  (): IUseDeleteDisciplineGroupPost.Output => {
    const queryClient = useQueryClient()
    const toast = useToast()

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

          toast.success('Postagem removida com sucesso!')
        },
      },
    )

    return { isDeleting, delete: deletePost }
  }
