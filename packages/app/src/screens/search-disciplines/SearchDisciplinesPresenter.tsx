import { IDiscipline } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useMe } from '@/contexts/me'
import { useNavigation } from '@/helpers'
import { useGetAllDisciplines } from '@/hooks/api'
import { IFilterParams, IUsePaginatedList } from '@/types/list'
import { AppNavigation } from '@/types/navigation'

import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useContext, useState } from 'react'

export type ISearchDisciplinesFilter = IFilterParams & {
  code?: string
}

export interface SearchDisciplinesPresenterContextData {
  disciplines: IUsePaginatedList<IDiscipline>
  code: string
  onCodeChange: (code: string) => void
  onDisciplineSelected: (discipline: IDiscipline) => void
}

const SearchDisciplinesPresenterContext = React.createContext(
  {} as SearchDisciplinesPresenterContextData,
)

const initialFilter: ISearchDisciplinesFilter = {
  page: 0,
  limit: 10,
}

export const SearchDisciplinesPresenter: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<AppNavigation, 'SearchDisciplinesScreen'>>()

  const { user } = useMe()

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
    teacherId: user?.teacher?.id,
  })

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  const handleRefresh = () => {
    refresh()
  }

  const handleDisciplineSelected = (discipline: IDiscipline) => {
    navigation.goBack()
    route.params.onDisciplineSelected(discipline)
  }

  const handleCodeChange = (code: string) => {
    setCode(code)
  }

  if (isLoading) return <FullLoading />

  return (
    <SearchDisciplinesPresenterContext.Provider
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
        onDisciplineSelected: handleDisciplineSelected,
      }}
    >
      {children}
    </SearchDisciplinesPresenterContext.Provider>
  )
}

export const withSearchDisciplinesPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <SearchDisciplinesPresenter>
        <Component {...props} />
      </SearchDisciplinesPresenter>
    )
  }
}

export const useSearchDisciplinesPresenter = () =>
  useContext(SearchDisciplinesPresenterContext)
