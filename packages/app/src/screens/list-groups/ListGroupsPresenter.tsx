import { IDiscipline, IDisciplineGroup } from '@shared/entities'

import { BaseError, useNavigation } from '@/helpers'
import { AppNavigation } from '@/types/navigation'

import { RouteProp, useNavigationState, useRoute } from '@react-navigation/core'
import { CommonActions } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext } from 'react'
import {
  noWait,
  useGetRecoilValueInfo_UNSTABLE,
  useRecoilCallback,
  useRecoilSnapshot,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
  waitForAll,
} from 'recoil'
import {
  getDisciplineGroupQuery,
  subscribeStudentQuery,
} from '@/state/discipline-group'
import { FullLoading } from '@/components/FullLoading'
import { getRecoil } from 'recoil-nexus'
import { useEffect } from 'react'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { getAllDisciplinesQuery } from '@/state/discipline'
import { IFilterParams, IPaginatedList } from '@/types/list'
import { useInfiniteQuery } from 'react-query'
import api from '@/api'
import { useRef } from 'react'

export type IListGroupsFilter = IFilterParams & {
  code?: string
}

export type IListGroupsFilterUpdater = (
  filter: IListGroupsFilter,
) => IListGroupsFilter

export interface ListGroupsPresenterContextData {
  loading: boolean
  disciplines: IPaginatedList<IDiscipline>
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

  const { isLoading, data } = useInfiniteQuery(
    ['disciplines', code],
    async ({ pageParam = initialFilter }) => {
      return api.discipline.getDisciplines({
        page: pageParam.page,
        limit: pageParam.limit,
        code,
      })
    },
    {
      keepPreviousData: true,
      staleTime: 0,
      cacheTime: 0,
      getNextPageParam: (_, pages) => {
        return { ...initialFilter, page: pages.length }
      },
    },
  )

  const handleDisciplineGroupSelected = (
    discipline: IDiscipline,
    disciplineGroup: IDisciplineGroup,
  ) => {
    route.params.onDisciplineGroupSelected(discipline, disciplineGroup)

    navigation.goBack()
  }

  const handleCodeChange = (code: string) => {
    setCode(code)
  }

  if (!data) return null

  return (
    <ListGroupsPresenterContext.Provider
      value={{
        loading: isLoading,
        onCodeChange: handleCodeChange,
        disciplines: data.pages.reduce(
          (acc, page) => ({
            results: [...acc.results, ...page.results],
            total: Math.max(acc.total, page.total),
          }),
          { results: [], total: 0 },
        ),
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
