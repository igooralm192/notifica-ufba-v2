import api from '@/api'
import { useToast } from '@/contexts/toast'
import { useMutation, useQueryClient } from 'react-query'

import { IUseCreateDisciplineGroupPost } from './types'

export const useCreateDisciplineGroupPost =
  (): IUseCreateDisciplineGroupPost.Output => {
    const queryClient = useQueryClient()
    const toast = useToast()

    const { isLoading: isCreating, mutateAsync: createPost } = useMutation(
      ({
        disciplineGroupId,
        content,
      }: IUseCreateDisciplineGroupPost.Params &
        IUseCreateDisciplineGroupPost.Body) => {
        return api.disciplineGroup.createPost(
          { disciplineGroupId },
          { content },
        )
      },
      {
        onSuccess: (_, { disciplineGroupId }) => {
          queryClient.invalidateQueries([
            'disciplineGroupPosts',
            disciplineGroupId,
          ])

          toast.success('Postagem criada com sucesso!')
        },
      },
    )

    return { isCreating, create: createPost }
  }
