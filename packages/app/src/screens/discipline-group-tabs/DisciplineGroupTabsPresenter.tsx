import { IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useGetDisciplineGroup } from '@/hooks/api'
import { AppNavigation } from '@/types/navigation'

import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useState } from 'react'

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
  DisciplineGroupTabsPresenterProps
> = ({ disciplineGroupId, initialTab, children }) => {
  const [index, setIndex] = useState(initialTab === 'chat' ? 1 : 0)

  const { isLoading, disciplineGroup } = useGetDisciplineGroup({
    disciplineGroupId,
  })

  if (isLoading) return <FullLoading />
  if (!disciplineGroup) return null

  return (
    <DisciplineGroupTabsPresenterContext.Provider
      value={{
        disciplineGroup,
        tabs: {
          currentIndex: index,
          onChangeIndex: setIndex
        }
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
