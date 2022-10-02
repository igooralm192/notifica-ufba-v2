import { IDiscipline } from '@shared/entities'
import { BaseError } from '@/helpers'

import api from '@/api'
import { useDispatch, useSelector } from '@/store'
import { disciplinesAdded, selectAllDisciplines } from '@/store/disciplines'
import { IFilterParams, IPaginatedList } from '@/types/list'

import React, { useContext, useState } from 'react'
import Toast from 'react-native-toast-message'
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from 'recoil'
import {
  disciplinesFilterState,
  disciplinesState,
  getAllDisciplinesQuery,
} from '@/state/discipline'
import { FullLoading } from '@/components/FullLoading'
import { useEffect } from 'react'
import { setRecoil } from 'recoil-nexus'
import { useInfiniteQuery } from 'react-query'

export interface DisciplinePresenterContextData {
  loading: boolean
  disciplines: IPaginatedList<IDiscipline>
}

const DisciplinePresenterContext = React.createContext(
  {} as DisciplinePresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const DisciplinePresenter: React.FC = ({ children }) => {
  const { isLoading, isFetching, data } = useInfiniteQuery(
    'disciplines',
    async ({ pageParam = initialFilter }) => {
      return api.discipline.getDisciplines({
        page: pageParam.page,
        limit: pageParam.limit,
      })
    },
    {
      keepPreviousData: true,
      getNextPageParam: (_, pages) => {
        return { ...initialFilter, page: pages.length }
      },
    },
  )

  if (isLoading) return <FullLoading />
  if (!data) return null

  return (
    <DisciplinePresenterContext.Provider
      value={{
        loading: isFetching,
        disciplines: data.pages.reduce(
          (acc, page) => ({
            results: [...acc.results, ...page.results],
            total: Math.max(acc.total, page.total),
          }),
          { results: [], total: 0 },
        ),
      }}
    >
      {children}
    </DisciplinePresenterContext.Provider>
  )
}

export const withDisciplinePresenter = (Component: React.FC) => {
  return (props: any) => (
    <DisciplinePresenter>
      <Component {...props} />
    </DisciplinePresenter>
  )
}

export const useDisciplinePresenter = () =>
  useContext(DisciplinePresenterContext)
