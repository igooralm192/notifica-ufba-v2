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
import { useMutation, useQuery, useQueryClient } from 'react-query'
import api from '@/api'

export interface DisciplineGroupInfoPresenterContextData {
  subscribing: boolean
  disciplineGroup: IDisciplineGroup | null
  subscribeStudent: () => Promise<void>
}

const DisciplineGroupInfoPresenterContext = React.createContext(
  {} as DisciplineGroupInfoPresenterContextData,
)

export const DisciplineGroupInfoPresenter: React.FC<{
  disciplineGroupId: string
}> = ({ disciplineGroupId, children }) => {
  const navigation = useNavigation()

  const queryClient = useQueryClient()

  const { isLoading, data } = useQuery(
    ['disciplineGroup', disciplineGroupId],
    () => api.disciplineGroup.getDisciplineGroup(disciplineGroupId),
  )

  const { isLoading: isSubscribing, mutate } = useMutation(
    async () => {
      try {
        await api.disciplineGroup.subscribeStudent({ disciplineGroupId })

        navigation.dispatch(
          StackActions.replace('DisciplineGroupTabsScreen', {
            disciplineGroupId,
          }),
        )
      } catch (err) {
        const error = err as BaseError

        Toast.show({
          type: 'error',
          text1: 'Erro ao inscrever estudante na turma.',
          text2: error.message,
        })
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('disciplineGroups')
      },
    },
  )

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <DisciplineGroupInfoPresenterContext.Provider
      value={{
        subscribing: isSubscribing,
        disciplineGroup: data.disciplineGroup,
        subscribeStudent: async () => mutate(),
      }}
    >
      {children}
    </DisciplineGroupInfoPresenterContext.Provider>
  )
}

export const withDisciplineGroupInfoPresenter = (Component: React.FC<any>) => {
  return ({
    route,
    ...props
  }: StackScreenProps<AppNavigation, 'DisciplineGroupInfoScreen'>) => {
    const { disciplineGroupId } = route.params

    return (
      <DisciplineGroupInfoPresenter disciplineGroupId={disciplineGroupId}>
        <Component {...props} />
      </DisciplineGroupInfoPresenter>
    )
  }
}

export const useDisciplineGroupInfoPresenter = () =>
  useContext(DisciplineGroupInfoPresenterContext)
