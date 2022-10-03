import { IDisciplineGroupPost } from '@shared/entities'

import api from '@/api'
import { FullLoading } from '@/components/FullLoading'
import { IFilterParams } from '@/types/list'

import React, { useContext } from 'react'
import { useInfiniteQuery } from 'react-query'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'

export interface DisciplineGroupMuralPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  disciplineGroupPosts: IDisciplineGroupPost[]
  onNextPage: () => void
  onRefresh: () => void
}

const DisciplineGroupMuralPresenterContext = React.createContext(
  {} as DisciplineGroupMuralPresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const DisciplineGroupMuralPresenter: React.FC = ({ children }) => {
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    'disciplineGroupPosts',
    async ({ pageParam = initialFilter }) => {
      return api.disciplineGroup.getDisciplineGroupPosts(disciplineGroup!.id, {
        page: pageParam.page,
        limit: pageParam.limit,
      })
    },
    {
      enabled: !!disciplineGroup?.id,
      keepPreviousData: true,
      // refetchOnMount: 'always',
      getNextPageParam: (lastPage, pages) => {
        const allResults = pages.reduce(
          (acc, page) => [...acc, ...page.results],
          [] as IDisciplineGroupPost[],
        )

        if (allResults.length >= lastPage.total) return undefined

        return { ...initialFilter, page: pages.length }
      },
    },
  )

  const handleNextPage = () => {
    if (!isFetchingNextPage && hasNextPage)
      fetchNextPage()
  }

  const handleRefresh = () => {
    refetch()
  }

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <DisciplineGroupMuralPresenterContext.Provider
      value={{
        isFetchingMore: isFetchingNextPage,
        isRefreshing: isRefetching,
        disciplineGroupPosts: data.pages.reduce(
          (acc: IDisciplineGroupPost[], page) => [...acc, ...page.results],
          [],
        ),
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,
      }}
    >
      {children}
    </DisciplineGroupMuralPresenterContext.Provider>
  )
}

export const withDisciplineGroupMuralPresenter = (Component: React.FC<any>) => {
  return (props: any) => {
    return (
      <DisciplineGroupMuralPresenter>
        <Component {...props} />
      </DisciplineGroupMuralPresenter>
    )
  }
}

export const useDisciplineGroupMuralPresenter = () =>
  useContext(DisciplineGroupMuralPresenterContext)
