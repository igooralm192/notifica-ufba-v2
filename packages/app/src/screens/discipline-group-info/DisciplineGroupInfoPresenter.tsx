import { IDisciplineGroup } from '@shared/entities'

import api from '@/api'
import { FullLoading } from '@/components/FullLoading'
import { BaseError, useNavigation } from '@/helpers'
import { AppNavigation } from '@/types/navigation'

import { StackActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Toast from 'react-native-toast-message'

export interface DisciplineGroupInfoPresenterContextData {
  subscribing: boolean
  unsubscribing: boolean
  disciplineGroup: IDisciplineGroup | null
  subscribeStudent: () => Promise<void>
  unsubscribeStudent: () => Promise<void>
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

  const { isLoading: isSubscribing, mutateAsync: subscribeStudent } =
    useMutation(
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
            text1: 'Erro ao inscrever estudante nesta turma.',
            text2: error.message,
          })
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('disciplineGroups')
          queryClient.invalidateQueries('lastMessages')
        },
      },
    )

  const { isLoading: isUnsubscribing, mutateAsync: unsubscribeStudent } =
    useMutation(
      async () => {
        try {
          await api.disciplineGroup.unsubscribeStudent({ disciplineGroupId })

          await queryClient.invalidateQueries([
            'disciplineGroup',
            disciplineGroupId,
          ])
        } catch (err) {
          const error = err as BaseError

          Toast.show({
            type: 'error',
            text1: 'Erro ao desinscrever estudante nesta turma.',
            text2: error.message,
          })
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('disciplineGroups')
          queryClient.invalidateQueries('lastMessages')
        },
      },
    )

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <DisciplineGroupInfoPresenterContext.Provider
      value={{
        subscribing: isSubscribing,
        unsubscribing: isUnsubscribing,
        disciplineGroup: data.disciplineGroup,
        subscribeStudent,
        unsubscribeStudent,
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
