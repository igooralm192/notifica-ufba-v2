import { IDiscipline } from '@shared/entities'
import { BaseError } from '@/helpers'

import api from '@/api'
import { useDispatch, useSelector } from '@/store'
import { disciplinesAdded, selectAllDisciplines } from '@/store/disciplines'
import { IPageParams, IPaginatedList } from '@/types/list'

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

export interface DisciplinePresenterContextData {
  disciplines: IPaginatedList<IDiscipline>
}

const DisciplinePresenterContext = React.createContext(
  {} as DisciplinePresenterContextData,
)

export const DisciplinePresenter: React.FC = ({ children }) => {
  const [filter, setFilter] = useRecoilState(disciplinesFilterState)

  const loadingDisciplines =
    useRecoilValueLoadable(getAllDisciplinesQuery(filter)).state === 'loading'

  const [disciplinesLoadable, setDisciplines] = useRecoilStateLoadable(disciplinesState)


  const getAllDisciplines = useRecoilCallback(
    ({ snapshot }) =>
      async ({ page, limit }: IPageParams) => {
        const allDisciplines = await snapshot.getPromise(
          getAllDisciplinesQuery({ page, limit }),
        )

        if (page === 0) setDisciplines(allDisciplines)
        else
          setDisciplines(currentDisciplines => ({
            results: [...currentDisciplines.results, ...allDisciplines.results],
            total: allDisciplines.total,
          }))
      },
    [],
  )

  useEffect(() => {
    getAllDisciplines(filter)
  }, [filter])

  if (disciplinesLoadable.state === 'loading') return <FullLoading />

  return (
    <DisciplinePresenterContext.Provider
      value={{ disciplines: disciplinesLoadable.getValue() }}
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
