import { IDiscipline } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useNavigation } from '@/helpers'
import { useGetAllDisciplines } from '@/hooks/api'
import { IFilterParams } from '@/types/list'
import { AppNavigation } from '@/types/navigation'

import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useContext, useState } from 'react'

export type IListDisciplinesFilter = IFilterParams & {
  code?: string
}

export type IListDisciplinesFilterUpdater = (
  filter: IListDisciplinesFilter,
) => IListDisciplinesFilter

export interface ListDisciplinesPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  disciplines: IDiscipline[]
  onNextPage: () => void
  onRefresh: () => void
  onCodeChange: (code: string) => void
  onDisciplineSelected: (discipline: IDiscipline) => void
}

const ListDisciplinesPresenterContext = React.createContext(
  {} as ListDisciplinesPresenterContextData,
)

const initialFilter: IListDisciplinesFilter = {
  page: 0,
  limit: 10,
}

export const ListDisciplinesPresenter: React.FC = ({ children }) => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<AppNavigation, 'ListDisciplinesScreen'>>()

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

  const handleDisciplineSelected = (discipline: IDiscipline) => {
    route.params.onDisciplineSelected(discipline)

    navigation.goBack()
  }

  const handleCodeChange = (code: string) => {
    setCode(code)
  }

  if (isLoading) return <FullLoading />

  return (
    <ListDisciplinesPresenterContext.Provider
      value={{
        isFetchingMore,
        isRefreshing,
        disciplines,
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,
        onCodeChange: handleCodeChange,
        onDisciplineSelected: handleDisciplineSelected
      }}
    >
      {children}
    </ListDisciplinesPresenterContext.Provider>
  )
}

export const withListDisciplinesPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <ListDisciplinesPresenter>
        <Component {...props} />
      </ListDisciplinesPresenter>
    )
  }
}

export const useListDisciplinesPresenter = () =>
  useContext(ListDisciplinesPresenterContext)
