import { IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useMe } from '@/contexts/me'
import {
  useDeleteDisciplineGroup,
  useGetAllDisciplineGroups,
  useUnsubscribeStudent,
} from '@/hooks/api'
import { useDebounce } from '@/hooks/common'
import { getMessagingStore } from '@/state/zustand/messaging'
import { IFilterParams } from '@/types/list'

import React, { useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

export interface DisciplineGroupsPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  disciplineGroups: IDisciplineGroup[]
  onNextPage: () => void
  onRefresh: () => void

  deleteDisciplineGroup: {
    loading: boolean
    delete: (disciplineGroupId: string) => Promise<void>
  }

  unsubscribeStudent: {
    loading: boolean
    unsubscribe: (disciplineGroupId: string) => Promise<void>
  }

  search: {
    open: boolean
    text: string
    show: () => void
    hide: () => void
    onChange: (text: string) => void
  }

  menu: {
    open: boolean
    show: () => void
    hide: () => void
  }
}

export interface IDisciplineGroupsFilterParams extends IFilterParams {
  search?: string
}

const DisciplineGroupsPresenterContext = React.createContext(
  {} as DisciplineGroupsPresenterContextData,
)

const initialFilter: IDisciplineGroupsFilterParams = {
  page: 0,
  limit: 10,
  search: '',
}

export const DisciplineGroupsPresenter: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useMe()
  const queryClient = useQueryClient()

  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [filter, setFilter] =
    useState<IDisciplineGroupsFilterParams>(initialFilter)

  const dSearchText = useDebounce(filter.search ?? '', 300)

  const {
    isLoading,
    isFetchingMore,
    isRefreshing,
    disciplineGroups,
    fetchNextPage,
    hasNextPage,
    refresh,
  } = useGetAllDisciplineGroups({
    ...filter,
    search: searchOpen ? dSearchText : undefined,
    studentId: user?.student?.id,
    teacherId: user?.teacher?.id,
  })

  const { isUnsubscribing, unsubscribe } = useUnsubscribeStudent()
  const { isDeleting, delete: deleteGroup } = useDeleteDisciplineGroup()

  const showMenu = () => setMenuOpen(true)
  const hideMenu = () => setMenuOpen(false)

  const showSearch = () => setSearchOpen(true)
  const hideSearch = () => setSearchOpen(false)

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  const handleRefresh = () => {
    refresh()
  }

  const handleUnsubscribeStudent = async (disciplineGroupId: string) => {
    await unsubscribe({ disciplineGroupId })
  }

  const handleDeleteDisciplineGroup = async (disciplineGroupId: string) => {
    await deleteGroup({ params: { disciplineGroupId } })
  }

  const handleSearchChange = (text: string) => {
    setFilter({ ...filter, search: text })
  }

  useEffect(() => {
    const unsubscribe = getMessagingStore().subscribe(
      state => state.removeMemberMessage,
      () => {
        queryClient.invalidateQueries(['disciplineGroups'])
      },
    )

    return () => unsubscribe()
  }, [])

  if (isLoading) return <FullLoading />

  return (
    <DisciplineGroupsPresenterContext.Provider
      value={{
        isFetchingMore,
        isRefreshing,
        disciplineGroups,
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,

        deleteDisciplineGroup: {
          loading: isDeleting,
          delete: handleDeleteDisciplineGroup,
        },
        unsubscribeStudent: {
          loading: isUnsubscribing,
          unsubscribe: handleUnsubscribeStudent,
        },
        search: {
          open: searchOpen,
          text: filter.search ?? '',
          show: showSearch,
          hide: hideSearch,
          onChange: handleSearchChange,
        },
        menu: {
          open: menuOpen,
          show: showMenu,
          hide: hideMenu,
        },
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
