import { IDisciplineGroup } from '@shared/entities'

import { AppNavigation } from '@/types/navigation'

import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { FullLoading } from '@/components/FullLoading'
import { getDisciplineGroupQuery } from '@/state/discipline-group'

interface DisciplineGroupTabsPresenterProps {
  disciplineGroupId: string
  initialTab?: 'mural' | 'chat'
}

export interface DisciplineGroupTabsPresenterContextData {
  initialIndex: number
  disciplineGroup: IDisciplineGroup | null
}

const DisciplineGroupTabsPresenterContext = React.createContext(
  {} as DisciplineGroupTabsPresenterContextData,
)

export const DisciplineGroupTabsPresenter: React.FC<
  DisciplineGroupTabsPresenterProps
> = ({ disciplineGroupId, initialTab, children }) => {
  const disciplineGroupLoadable = useRecoilValueLoadable(
    getDisciplineGroupQuery(disciplineGroupId),
  )

  if (disciplineGroupLoadable.state === 'loading') return <FullLoading />

  return (
    <DisciplineGroupTabsPresenterContext.Provider
      value={{
        initialIndex: initialTab === 'chat' ? 1 : 0,

        disciplineGroup: disciplineGroupLoadable.getValue(),
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
