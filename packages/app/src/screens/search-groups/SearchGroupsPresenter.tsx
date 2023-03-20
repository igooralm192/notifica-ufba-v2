import { IDiscipline, IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useMe } from '@/contexts/me'
import { useNavigation } from '@/helpers'
import { useGetAllDisciplines } from '@/hooks/api'
import { useDebounce } from '@/hooks/common'
import { IFilterParams, IUsePaginatedList } from '@/types/list'
import { AppNavigation } from '@/types/navigation'

import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useContext, useState } from 'react'

export type ISearchGroupsFilter = IFilterParams & {
  code?: string
}

export interface SearchGroupsPresenterContextData {
  disciplines: IUsePaginatedList<IDiscipline>
  code: string
  onCodeChange: (code: string) => void
  onDisciplineGroupSelected: (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => void
}

const SearchGroupsPresenterContext = React.createContext(
  {} as SearchGroupsPresenterContextData,
)

const initialFilter: ISearchGroupsFilter = {
  page: 0,
  limit: 10,
}

export const SearchGroupsPresenter: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<AppNavigation, 'SearchGroupsScreen'>>()

  const { user } = useMe()

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
    teacherId: user?.teacher?.id,
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
    <SearchGroupsPresenterContext.Provider
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
    </SearchGroupsPresenterContext.Provider>
  )
}

export const withSearchGroupsPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <SearchGroupsPresenter>
        <Component {...props} />
      </SearchGroupsPresenter>
    )
  }
}

export const useSearchGroupsPresenter = () =>
  useContext(SearchGroupsPresenterContext)
