import { IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useGetDisciplineGroup } from '@/hooks/api'
import { AppNavigation } from '@/types/navigation'

import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { getMessagingStore, useMessagingStore } from '@/state/zustand/messaging'
import { getRouteByName, removeRoute } from '@/utils/navigation'
import { useNavigation } from '@/helpers'
import { CommonActions } from '@react-navigation/native'

interface DisciplineGroupTabsPresenterProps {
  disciplineGroupId: string
  initialTab?: 'mural' | 'chat'
}

export interface DisciplineGroupTabsPresenterContextData {
  disciplineGroup: IDisciplineGroup
  tabs: {
    currentIndex: number
    onChangeIndex: (index: number) => void
  }
}

const DisciplineGroupTabsPresenterContext = React.createContext(
  {} as DisciplineGroupTabsPresenterContextData,
)

export const DisciplineGroupTabsPresenter: React.FC<
  React.PropsWithChildren<DisciplineGroupTabsPresenterProps>
> = ({ disciplineGroupId, initialTab, children }) => {
  const navigation = useNavigation()

  const [index, setIndex] = useState(initialTab === 'chat' ? 1 : 0)

  const { isLoading, disciplineGroup } = useGetDisciplineGroup({
    disciplineGroupId,
  })

  useEffect(() => {
    const unsubscribe = getMessagingStore().subscribe(
      state => state.removeMemberMessage,
      params => {
        const route = getRouteByName(
          navigation.getState(),
          'DisciplineGroupTabsScreen',
        )

        const disciplineGroupTabsParams = route?.params as
          | AppNavigation['DisciplineGroupTabsScreen']
          | null

        if (
          disciplineGroupTabsParams?.disciplineGroupId ===
          params?.disciplineGroupId
        ) {
          navigation.dispatch(state =>
            CommonActions.reset(
              removeRoute(state, r => r.name === 'DisciplineGroupTabsScreen'),
            ),
          )
        }
      },
    )

    return () => unsubscribe()
  }, [])

  if (isLoading) return <FullLoading />
  if (!disciplineGroup) return null

  return (
    <DisciplineGroupTabsPresenterContext.Provider
      value={{
        disciplineGroup,
        tabs: {
          currentIndex: index,
          onChangeIndex: setIndex,
        },
      }}
    >
      {children}
    </DisciplineGroupTabsPresenterContext.Provider>
  )
}

export const withDisciplineGroupTabsPresenter = (Component: React.FC<any>) => {
  return ({
    route,
    ...props
  }: StackScreenProps<AppNavigation, 'DisciplineGroupTabsScreen'>) => {
    return (
      <DisciplineGroupTabsPresenter {...route.params}>
        <Component {...props} />
      </DisciplineGroupTabsPresenter>
    )
  }
}

export const useDisciplineGroupTabsPresenter = () =>
  useContext(DisciplineGroupTabsPresenterContext)
