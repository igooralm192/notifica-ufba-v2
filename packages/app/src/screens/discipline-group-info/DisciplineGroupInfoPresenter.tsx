import { IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useNavigation } from '@/helpers'
import {
  useGetDisciplineGroup,
  useSubscribeStudent,
  useUnsubscribeStudent,
} from '@/hooks/api'
import { AppNavigation } from '@/types/navigation'

import { StackActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'

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

  const { isLoading, disciplineGroup } = useGetDisciplineGroup({
    disciplineGroupId,
  })

  const { isSubscribing, subscribe } = useSubscribeStudent()
  const { isUnsubscribing, unsubscribe } = useUnsubscribeStudent()

  const handleSubscribeStudent = async () => {
    await subscribe({ disciplineGroupId })

    navigation.dispatch(
      StackActions.replace('DisciplineGroupTabsScreen', {
        disciplineGroupId,
      }),
    )
  }

  const handleUnsubscribeStudent = async () => {
    await unsubscribe({ disciplineGroupId })
  }

  if (isLoading) return <FullLoading />

  return (
    <DisciplineGroupInfoPresenterContext.Provider
      value={{
        subscribing: isSubscribing,
        unsubscribing: isUnsubscribing,
        disciplineGroup,
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
