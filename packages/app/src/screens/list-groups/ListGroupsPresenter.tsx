import { IDiscipline, IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useNavigation } from '@/helpers'
import { useGetAllDisciplines } from '@/hooks/api'
import { IFilterParams } from '@/types/list'
import { AppNavigation } from '@/types/navigation'

import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useContext, useState } from 'react'

export type IListGroupsFilter = IFilterParams & {
  code?: string
}

export type IListGroupsFilterUpdater = (
  filter: IListGroupsFilter,
) => IListGroupsFilter

export interface ListGroupsPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  disciplines: IDiscipline[]
  onNextPage: () => void
  onRefresh: () => void
  onCodeChange: (code: string) => void
  onDisciplineGroupSelected: (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => void
}

const ListGroupsPresenterContext = React.createContext(
  {} as ListGroupsPresenterContextData,
)

const initialFilter: IListGroupsFilter = {
  page: 0,
  limit: 10,
}

export const ListGroupsPresenter: React.FC = ({ children }) => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<AppNavigation, 'ListGroupsScreen'>>()

  const [code, setCode] = useState<string>('')

  const {
    isLoading,
    isFetchingMore,
    isRefreshing,
    disciplines,
    hasNextPage,
    fetchNextPage,
    refresh,
  } = useGetAllDisciplines({ ...initialFilter, code })

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  const handleRefresh = () => {
    refresh()
  }

  const handleDisciplineGroupSelected = (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => {
    navigation.goBack()
    route.params.onDisciplineGroupSelected(discipline, disciplineGroup)
  }

  const handleCodeChange = (code: string) => {
    setCode(code)
  }

  if (isLoading) return <FullLoading />

  return (
    <ListGroupsPresenterContext.Provider
      value={{
        isFetchingMore,
        isRefreshing,
        disciplines,
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,
        onCodeChange: handleCodeChange,
        onDisciplineGroupSelected: handleDisciplineGroupSelected,
      }}
    >
      {children}
    </ListGroupsPresenterContext.Provider>
  )
}

export const withListGroupsPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <ListGroupsPresenter>
        <Component {...props} />
      </ListGroupsPresenter>
    )
  }
}

export const useListGroupsPresenter = () =>
  useContext(ListGroupsPresenterContext)
