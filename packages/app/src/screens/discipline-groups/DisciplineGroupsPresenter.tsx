import { IDisciplineGroup } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import { useMe } from '@/contexts/me'
import { useGetAllDisciplineGroups, useUnsubscribeStudent } from '@/hooks/api'
import { useDebounce } from '@/hooks/common'
import { IFilterParams } from '@/types/list'

import React, { useContext, useState } from 'react'

export interface DisciplineGroupsPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  isUnsubscribing: boolean
  disciplineGroups: IDisciplineGroup[]
  unsubscribeStudent: (disciplineGroupId: string) => Promise<void>
  onNextPage: () => void
  onRefresh: () => void

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
  studentId?: string
  teacherId?: string
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

export const DisciplineGroupsPresenter: React.FC = ({ children }) => {
  const { user } = useMe()

  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [filter, setFilter] = useState<IDisciplineGroupsFilterParams>({
    ...initialFilter,
    studentId: user?.student?.id,
    teacherId: user?.teacher?.id,
  })

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
  })

  const { isUnsubscribing, unsubscribe } = useUnsubscribeStudent()

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

  const handleSearchChange = (text: string) => {
    setFilter({ ...filter, search: text })
  }

  if (isLoading) return <FullLoading />
  return (
    <DisciplineGroupsPresenterContext.Provider
      value={{
        isFetchingMore,
        isRefreshing,
        isUnsubscribing,
        disciplineGroups,
        unsubscribeStudent: handleUnsubscribeStudent,
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,
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
