import { IDisciplineGroup } from '@shared/entities'

import { BaseError, useNavigation } from '@/helpers'
import { AppNavigation } from '@/types/navigation'

import { StackActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import {
  noWait,
  useGetRecoilValueInfo_UNSTABLE,
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'
import {
  getDisciplineGroupQuery,
  subscribeStudentQuery,
} from '@/state/discipline-group'
import { FullLoading } from '@/components/FullLoading'
import { getRecoil } from 'recoil-nexus'
import { useEffect } from 'react'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { createPostMutation } from '@/state/discipline-group-post'
import { ICreatePostEndpoint } from '@/api/discipline-group/types'
import { useMutation, useQueryClient } from 'react-query'
import api from '@/api'

export interface CreatePostPresenterContextData {
  creating: boolean
  createPost: (disciplineGroupId: string, content: string) => Promise<void>
}

const CreatePostPresenterContext = React.createContext(
  {} as CreatePostPresenterContextData,
)

export const CreatePostPresenter: React.FC = ({ children }) => {
  const navigation = useNavigation()
  const queryClient = useQueryClient()

  const { isLoading: isCreating, mutate: createPost } = useMutation(
    async ({
      disciplineGroupId,
      content,
    }: {
      disciplineGroupId: string
      content: string
    }) => {
      try {
        await api.disciplineGroup.createPost({ disciplineGroupId }, { content })

        Toast.show({
          type: 'success',
          text1: 'Postagem criada com sucesso!',
        })

        navigation.goBack()
      } catch (err) {
        const error = err as BaseError
        Toast.show({
          type: 'error',
          text1: `Erro ao criar postagem na turma ${disciplineGroupId}`,
          text2: error.message,
        })
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('disciplineGroupPosts')
      },
    },
  )

  const handleCreatePost = async (disciplineGroupId: string, content: string) => {
    createPost({disciplineGroupId, content})
  }

  return (
    <CreatePostPresenterContext.Provider
      value={{
        creating: isCreating,
        createPost: handleCreatePost,
      }}
    >
      {children}
    </CreatePostPresenterContext.Provider>
  )
}

export const withCreatePostPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <CreatePostPresenter>
        <Component {...props} />
      </CreatePostPresenter>
    )
  }
}

export const useCreatePostPresenter = () =>
  useContext(CreatePostPresenterContext)
