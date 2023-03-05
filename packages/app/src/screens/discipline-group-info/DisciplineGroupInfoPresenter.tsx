import { IDisciplineGroup } from '@shared/entities'
import { IDisciplineGroupMemberDTO } from '@shared/dtos'

import { FullLoading } from '@/components/FullLoading'
import { useNavigation } from '@/helpers'
import {
  useGetAllDisciplineGroupMembers,
  useGetDisciplineGroup,
  useSubscribeStudent,
  useUnsubscribeStudent,
} from '@/hooks/api'
import { AppNavigation } from '@/types/navigation'
import { removeRoute } from '@/utils/navigation'

import { StackActions, CommonActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'

export interface DisciplineGroupInfoPresenterContextData {
  subscribing: boolean
  unsubscribing: boolean
  disciplineGroup: IDisciplineGroup
  disciplineGroupMembers: IDisciplineGroupMemberDTO[]
  subscribeStudent: () => Promise<void>
  unsubscribeStudent: () => Promise<void>
}

const DisciplineGroupInfoPresenterContext = React.createContext(
  {} as DisciplineGroupInfoPresenterContextData,
)

export const DisciplineGroupInfoPresenter: React.FC<
  React.PropsWithChildren<{
    disciplineGroupId: string
  }>
> = ({ disciplineGroupId, children }) => {
  const navigation = useNavigation()

  const { isLoading, disciplineGroup } = useGetDisciplineGroup({
    disciplineGroupId,
  })

  const { isLoading: isLoadingMembers, disciplineGroupMembers } =
    useGetAllDisciplineGroupMembers({ disciplineGroupId })

  const { isSubscribing, subscribe } = useSubscribeStudent()
  const { isUnsubscribing, unsubscribe } = useUnsubscribeStudent()

  const handleSubscribeStudent = async () => {
    await subscribe({ disciplineGroupId })

    navigation.dispatch(
      CommonActions.reset(
        removeRoute(
          navigation.getState(),
          r => r.name === 'DisciplineGroupTabsScreen',
        ),
      ),
    )

    navigation.dispatch(
      StackActions.replace('DisciplineGroupTabsScreen', {
        disciplineGroupId,
      }),
    )
  }

  const handleUnsubscribeStudent = async () => {
    await unsubscribe({ disciplineGroupId })

    navigation.dispatch(
      CommonActions.reset(
        removeRoute(
          navigation.getState(),
          r => r.name === 'DisciplineGroupTabsScreen',
        ),
      ),
    )
  }

  if (isLoading || isLoadingMembers) return <FullLoading />

  if (!disciplineGroup) return null

  return (
    <DisciplineGroupInfoPresenterContext.Provider
      value={{
        subscribing: isSubscribing,
        unsubscribing: isUnsubscribing,
        disciplineGroup,
        disciplineGroupMembers,
        subscribeStudent: handleSubscribeStudent,
        unsubscribeStudent: handleUnsubscribeStudent,
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
