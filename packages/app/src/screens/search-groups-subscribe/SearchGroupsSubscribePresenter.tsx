import { IDiscipline, IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useMe } from '@/contexts/me'
import { useNavigation } from '@/helpers'
import { useGetAllDisciplines } from '@/hooks/api'
import { IFilterParams, IUsePaginatedList } from '@/types/list'
import { AppNavigation } from '@/types/navigation'

import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useContext, useState } from 'react'

export type ISearchGroupsSubscribeFilter = IFilterParams & {
  code?: string
}

export interface SearchGroupsSubscribePresenterContextData {
  disciplines: IUsePaginatedList<IDiscipline>
  code: string
  onCodeChange: (code: string) => void
  onDisciplineGroupSelected: (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => void
}

const SearchGroupsSubscribePresenterContext = React.createContext(
  {} as SearchGroupsSubscribePresenterContextData,
)

const initialFilter: ISearchGroupsSubscribeFilter = {
  page: 0,
  limit: 10,
}

export const SearchGroupsSubscribePresenter: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<AppNavigation, 'SearchGroupsSubscribeScreen'>>()

  const [code, setCode] = useState<string>('')

  const {
    isLoading,
    isFetchingMore,
    isRefreshing,
    disciplines,
    hasNextPage,
    fetchNextPage,
    refresh,
  } = useGetAllDisciplines({
    ...initialFilter,
    code,
  })

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
    <SearchGroupsSubscribePresenterContext.Provider
      value={{
        disciplines: {
          isFetchingMore,
          isRefreshing,
          data: disciplines,
          onNextPage: handleNextPage,
          onRefresh: handleRefresh,
        },
        code,
        onCodeChange: handleCodeChange,
        onDisciplineGroupSelected: handleDisciplineGroupSelected,
      }}
    >
      {children}
    </SearchGroupsSubscribePresenterContext.Provider>
  )
}

export const withSearchGroupsSubscribePresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <SearchGroupsSubscribePresenter>
        <Component {...props} />
      </SearchGroupsSubscribePresenter>
    )
  }
}

export const useSearchGroupsSubscribePresenter = () =>
  useContext(SearchGroupsSubscribePresenterContext)
