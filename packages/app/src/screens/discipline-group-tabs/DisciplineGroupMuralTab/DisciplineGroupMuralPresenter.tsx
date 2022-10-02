import { IDisciplineGroupPost } from '@shared/entities'

import { IFilterParams, IPaginatedList } from '@/types/list'

import React, { useContext } from 'react'
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from 'recoil'
import { FullLoading } from '@/components/FullLoading'
import {
  disciplineGroupPostsFilterState,
  disciplineGroupPostsState,
  getDisciplineGroupPostsQuery,
  IGetDisciplineGroupPostsQueryArgs,
} from '@/state/discipline-group-post'
import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'
import { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import api from '@/api'

export interface DisciplineGroupMuralPresenterContextData {
  loadingPosts: boolean
  disciplineGroupPosts: IPaginatedList<IDisciplineGroupPost>
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

  const { isLoading, data } = useInfiniteQuery(
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
      refetchOnMount: 'always',
      getNextPageParam: (_, pages) => {
        return { ...initialFilter, page: pages.length }
      },
    },
  )

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <DisciplineGroupMuralPresenterContext.Provider
      value={{
        loadingPosts: isLoading,

        disciplineGroupPosts: data.pages.reduce(
          (acc, page) => ({
            results: [...acc.results, ...page.results],
            total: Math.max(acc.total, page.total),
          }),
          { results: [], total: 0 },
        ),
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
