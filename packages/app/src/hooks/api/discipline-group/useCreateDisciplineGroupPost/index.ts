import api from '@/api'
import { BaseError } from '@/helpers'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'

import { IUseCreateDisciplineGroupPost } from './types'

export const useCreateDisciplineGroupPost =
  (): IUseCreateDisciplineGroupPost.Output => {
    const queryClient = useQueryClient()

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

          Toast.show({
            type: 'success',
            text1: 'Postagem criada com sucesso!',
          })
        },
        onError: (error: BaseError) => {
          Toast.show({
            type: 'error',
            text1: `Erro ao criar postagem nesta turma`,
            text2: error.message,
          })
        },
      },
    )

    return { isCreating, create: createPost }
  }
