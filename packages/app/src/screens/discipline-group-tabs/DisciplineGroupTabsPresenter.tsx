import { IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useNavigation } from '@/helpers'
import { useGetDisciplineGroup } from '@/hooks/api'
import { AppNavigation } from '@/types/navigation'

import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'

interface DisciplineGroupTabsPresenterProps {
  disciplineGroupId: string
  initialTab?: 'mural' | 'chat'
}

export interface DisciplineGroupTabsPresenterContextData {
  initialIndex: number
  disciplineGroup: IDisciplineGroup
  navigateToCreatePost: () => void
}

const DisciplineGroupTabsPresenterContext = React.createContext(
  {} as DisciplineGroupTabsPresenterContextData,
)

export const DisciplineGroupTabsPresenter: React.FC<
  DisciplineGroupTabsPresenterProps
> = ({ disciplineGroupId, initialTab, children }) => {
  const navigation = useNavigation()

  const { isLoading, disciplineGroup } = useGetDisciplineGroup({
    disciplineGroupId,
  })

  const navigateToCreatePost = () =>
    navigation.navigate('CreatePostScreen', {
      discipline: disciplineGroup?.discipline,
      disciplineGroup: disciplineGroup || undefined,
    })

  if (isLoading) return <FullLoading />
  if (!disciplineGroup) return null

  return (
    <DisciplineGroupTabsPresenterContext.Provider
      value={{
        initialIndex: initialTab === 'chat' ? 1 : 0,
        disciplineGroup,
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
