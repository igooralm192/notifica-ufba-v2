import { IDisciplineGroupPost } from '@shared/entities'

import { IPaginatedList } from '@/types/list'

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

export interface DisciplineGroupMuralPresenterContextData {
  loadingPosts: boolean
  disciplineGroupPosts: IPaginatedList<IDisciplineGroupPost>
}

const DisciplineGroupMuralPresenterContext = React.createContext(
  {} as DisciplineGroupMuralPresenterContextData,
)

export const DisciplineGroupMuralPresenter: React.FC = ({ children }) => {
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const [filter, setFilter] = useRecoilState(disciplineGroupPostsFilterState)

  const loadingDisciplineGroupPosts =
    useRecoilValueLoadable(
      getDisciplineGroupPostsQuery({
        disciplineGroupId: disciplineGroup?.id,
        filterParams: filter,
      }),
    ).state === 'loading'

  const [disciplineGroupPostsLoadable, setDisciplineGroupPosts] =
    useRecoilStateLoadable(disciplineGroupPostsState)

  const getDisciplineGroupPosts = useRecoilCallback(
    ({ snapshot }) =>
      async ({
        disciplineGroupId,
        filterParams,
      }: IGetDisciplineGroupPostsQueryArgs) => {
        const disciplineGroupPosts = await snapshot.getPromise(
          getDisciplineGroupPostsQuery({ disciplineGroupId, filterParams }),
        )

        if (filterParams.page === 0)
          setDisciplineGroupPosts(disciplineGroupPosts)
        else
          setDisciplineGroupPosts(currentDisciplineGroupPosts => ({
            results: [
              ...currentDisciplineGroupPosts.results,
              ...disciplineGroupPosts.results,
            ],
            total: disciplineGroupPosts.total,
          }))
      },
    [],
  )

  useEffect(() => {
    getDisciplineGroupPosts({
      disciplineGroupId: disciplineGroup?.id,
      filterParams: filter,
    })
  }, [filter])

  if (disciplineGroupPostsLoadable.state === 'loading') return <FullLoading />

  return (
    <DisciplineGroupMuralPresenterContext.Provider
      value={{
        loadingPosts: loadingDisciplineGroupPosts,

        disciplineGroupPosts: disciplineGroupPostsLoadable.getValue(),
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
