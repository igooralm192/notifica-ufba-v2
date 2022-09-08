import { IDisciplineGroup } from '@shared/entities'
import { BaseError } from '@/helpers'

import api from '@/api'
import { useMe } from '@/contexts/me'
import { useDispatch, useSelector } from '@/store'
import {
  disciplineGroupsAdded,
  selectAllDisciplineGroups,
} from '@/store/disciplineGroups'
import { IPageParams, IPaginatedList } from '@/types/list'

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

export interface DisciplineGroupsPresenterContextData {
  // loading: boolean
  disciplineGroups: IPaginatedList<IDisciplineGroup>
}

const DisciplineGroupsPresenterContext = React.createContext(
  {} as DisciplineGroupsPresenterContextData,
)

export const DisciplineGroupsPresenter: React.FC = ({ children }) => {
  const { user } = useMe()

  const [filter, setFilter] = useRecoilState(disciplineGroupsFilterState)

  const loadingDisciplineGroups =
    useRecoilValueLoadable(
      getMyDisciplineGroupsQuery({
        studentId: user?.student?.id,
        filterParams: filter,
      }),
    ).state === 'loading'

  const [disciplineGroupsLoadable, setDisciplineGroups] =
    useRecoilStateLoadable(disciplineGroupsState)

  const getMyDisciplineGroups = useRecoilCallback(
    ({ snapshot }) =>
      async ({ studentId, filterParams }: IGetMyDisciplineGroupsQueryArgs) => {
        const disciplineGroups = await snapshot.getPromise(
          getMyDisciplineGroupsQuery({ studentId, filterParams }),
        )

        if (filterParams.page === 0) setDisciplineGroups(disciplineGroups)
        else
          setDisciplineGroups(currentDisciplineGroups => ({
            results: [
              ...currentDisciplineGroups.results,
              ...disciplineGroups.results,
            ],
            total: disciplineGroups.total,
          }))
      },
    [],
  )

  useFocusEffect(
    useCallback(() => {
      getMyDisciplineGroups({
        studentId: user?.student?.id,
        filterParams: filter,
      })
    }, [user?.student?.id, filter]),
  )

  if (disciplineGroupsLoadable.state === 'loading') return <FullLoading />

  return (
    <DisciplineGroupsPresenterContext.Provider
      value={{
        disciplineGroups: disciplineGroupsLoadable.getValue(),
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
