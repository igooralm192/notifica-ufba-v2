import { IDiscipline, IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useNavigation } from '@/helpers'
import { useGetAllDisciplines } from '@/hooks/api'
import { useDebounce } from '@/hooks/common'
import { IFilterParams, IUsePaginatedList } from '@/types/list'
import { AppNavigation } from '@/types/navigation'

import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useContext, useState } from 'react'

export type ISearchSubscribedGroupsFilter = IFilterParams & {
  code?: string
}

export interface SearchSubscribedGroupsPresenterContextData {
  disciplines: IUsePaginatedList<IDiscipline>
  code: string
  onCodeChange: (code: string) => void
  onDisciplineGroupSelected: (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => void
}

const SearchSubscribedGroupsPresenterContext = React.createContext(
  {} as SearchSubscribedGroupsPresenterContextData,
)

const initialFilter: ISearchSubscribedGroupsFilter = {
  page: 0,
  limit: 10,
}

export const SearchSubscribedGroupsPresenter: React.FC<
  React.PropsWithChildren
> = ({ children }) => {
  const navigation = useNavigation()
  const route =
    useRoute<RouteProp<AppNavigation, 'SearchSubscribedGroupsScreen'>>()

  const [code, setCode] = useState<string>('')
  const dCode = useDebounce(code ?? '', 300)

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
    code: dCode,
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
    <SearchSubscribedGroupsPresenterContext.Provider
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
    </SearchSubscribedGroupsPresenterContext.Provider>
  )
}

export const withSearchSubscribedGroupsPresenter = (
  Component: React.FC<any>,
) => {
  return (props: any) => {
    return (
      <SearchSubscribedGroupsPresenter>
        <Component {...props} />
      </SearchSubscribedGroupsPresenter>
    )
  }
}

export const useSearchSubscribedGroupsPresenter = () =>
  useContext(SearchSubscribedGroupsPresenterContext)
