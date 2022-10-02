import { IDisciplineGroup } from '@shared/entities'
import { BaseError } from '@/helpers'

import api from '@/api'
import { useMe } from '@/contexts/me'
import { useDispatch, useSelector } from '@/store'
import {
  disciplineGroupsAdded,
  selectAllDisciplineGroups,
} from '@/store/disciplineGroups'
import { IFilterParams, IPaginatedList } from '@/types/list'

import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useContext, useState } from 'react'
import Toast from 'react-native-toast-message'
import {
  useRecoilCallback,
  useRecoilState,
  useRecoilStateLoadable,
  useRecoilValueLoadable,
} from 'recoil'
import {
  disciplineGroupsFilterState,
  disciplineGroupsState,
  getMyDisciplineGroupsQuery,
  IGetMyDisciplineGroupsQueryArgs,
} from '@/state/discipline-group'
import { useEffect } from 'react'
import { FullLoading } from '@/components/FullLoading'
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query'
import { useMemo } from 'react'
import { useRef } from 'react'
import { Ref } from 'react'
import { MutableRefObject } from 'react'
import { Text } from '@rneui/themed'

export interface DisciplineGroupsPresenterContextData {
  loading: boolean
  disciplineGroups: IPaginatedList<IDisciplineGroup>
}

const DisciplineGroupsPresenterContext = React.createContext(
  {} as DisciplineGroupsPresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const DisciplineGroupsPresenter: React.FC = ({ children }) => {
  const { user } = useMe()

  const { isLoading, data } = useInfiniteQuery(
    'disciplineGroups',
    async ({ pageParam = initialFilter }) => {
      return api.disciplineGroup.getDisciplineGroups({
        query: { studentId: user?.student?.id },
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
    <DisciplineGroupsPresenterContext.Provider
      value={{
        loading: isLoading,
        disciplineGroups: data.pages.reduce(
          (acc, page) => ({
            results: [...acc.results, ...page.results],
            total: Math.max(acc.total, page.total),
          }),
          { results: [], total: 0 },
        ),
      }}
    >
      {children}
    </DisciplineGroupsPresenterContext.Provider>
  )
}

export const withDisciplineGroupsPresenter = (Component: React.FC) => {
  return (props: any) => (
    <DisciplineGroupsPresenter>
      <Component {...props} />
    </DisciplineGroupsPresenter>
  )
}

export const useDisciplineGroupsPresenter = () =>
  useContext(DisciplineGroupsPresenterContext)
