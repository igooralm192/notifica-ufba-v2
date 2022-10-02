import { IDisciplineGroup } from '@shared/entities'

import { AppNavigation } from '@/types/navigation'

import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { FullLoading } from '@/components/FullLoading'
import { getDisciplineGroupQuery } from '@/state/discipline-group'
import { useNavigation } from '@/helpers'
import { useQuery } from 'react-query'
import api from '@/api'

interface DisciplineGroupTabsPresenterProps {
  disciplineGroupId: string
  initialTab?: 'mural' | 'chat'
}

export interface DisciplineGroupTabsPresenterContextData {
  initialIndex: number
  disciplineGroup: IDisciplineGroup | null
  navigateToCreatePost: () => void
}

const DisciplineGroupTabsPresenterContext = React.createContext(
  {} as DisciplineGroupTabsPresenterContextData,
)

export const DisciplineGroupTabsPresenter: React.FC<
  DisciplineGroupTabsPresenterProps
> = ({ disciplineGroupId, initialTab, children }) => {
  const navigation = useNavigation()

  const { isLoading, data } = useQuery(['disciplineGroup', disciplineGroupId], () => {
    return api.disciplineGroup.getDisciplineGroup(disciplineGroupId)
  })

  const navigateToCreatePost = () => navigation.navigate('CreatePostScreen', {
    discipline: data?.disciplineGroup?.discipline,
    disciplineGroup: data?.disciplineGroup
  })

  if (isLoading) return <FullLoading />

  if (!data) return null

  return (
    <DisciplineGroupTabsPresenterContext.Provider
      value={{
        initialIndex: initialTab === 'chat' ? 1 : 0,
        disciplineGroup: data.disciplineGroup,
        navigateToCreatePost,
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
