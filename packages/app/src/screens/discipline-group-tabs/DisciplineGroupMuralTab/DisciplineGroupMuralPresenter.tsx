import { IDisciplineGroupPost } from '@shared/entities'

import { FullLoading } from '@/components/FullLoading'
import {
  useDeleteDisciplineGroupPost,
  useGetAllDisciplineGroupPosts,
} from '@/hooks/api'
import { IFilterParams } from '@/types/list'

import React, { useContext } from 'react'

import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'
import { useNavigation } from '@/helpers'

export interface DisciplineGroupMuralPresenterContextData {
  isFetchingMore: boolean
  isRefreshing: boolean
  disciplineGroupPosts: IDisciplineGroupPost[]
  onNextPage: () => void
  onRefresh: () => void

  deletePost: {
    loading: boolean
    delete: (disciplineGroupPostId: string) => Promise<void>
  }

  navigate: {
    toCreatePost: () => void
  }
}

const DisciplineGroupMuralPresenterContext = React.createContext(
  {} as DisciplineGroupMuralPresenterContextData,
)

const initialFilter: IFilterParams = {
  page: 0,
  limit: 10,
}

export const DisciplineGroupMuralPresenter: React.FC = ({ children }) => {
  const navigation = useNavigation()

  const { disciplineGroup } = useDisciplineGroupTabsPresenter()

  const {
    isLoading,
    isFetchingMore,
    isRefreshing,
    disciplineGroupPosts,
    fetchNextPage,
    hasNextPage,
    refresh,
  } = useGetAllDisciplineGroupPosts(
    { disciplineGroupId: disciplineGroup.id },
    initialFilter,
  )

  const { isDeleting, delete: deletePost } = useDeleteDisciplineGroupPost()

  const handleNextPage = () => {
    if (!isFetchingMore && hasNextPage) fetchNextPage()
  }

  const handleRefresh = () => {
    refresh()
  }

  const handleDeletePost = async (disciplineGroupPostId: string) => {
    await deletePost({
      params: { disciplineGroupId: disciplineGroup.id, disciplineGroupPostId },
    })
  }

  const navigateToCreatePost = () =>
    navigation.navigate('CreatePostScreen', {
      discipline: disciplineGroup?.discipline,
      disciplineGroup: disciplineGroup || undefined,
    })

  if (isLoading) return <FullLoading />

  return (
    <DisciplineGroupMuralPresenterContext.Provider
      value={{
        isFetchingMore,
        isRefreshing,
        disciplineGroupPosts,
        onNextPage: handleNextPage,
        onRefresh: handleRefresh,
        deletePost: { loading: isDeleting, delete: handleDeletePost },
        navigate: { toCreatePost: navigateToCreatePost },
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
