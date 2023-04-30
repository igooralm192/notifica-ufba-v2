import { IDiscipline, IDisciplineGroup } from '@shared/entities'
import { SearchLayout } from '@/components/SearchLayout'
import { SearchList } from '@/components/SearchList'
import { useMe } from '@/contexts/me'

import React, { useMemo } from 'react'

import {
  useSearchSubscribedGroupsPresenter,
  withSearchSubscribedGroupsPresenter,
} from './SearchSubscribedGroupsPresenter'
import { SearchSubscribedGroupsItem } from './SearchSubscribedGroupsItem'

const SearchSubscribedGroupsScreen: React.FC = () => {
  const { user } = useMe()

  const { disciplines, code, onCodeChange, onDisciplineGroupSelected } =
    useSearchSubscribedGroupsPresenter()

  const isStudentMember = (group: IDisciplineGroup) =>
    group.studentIds?.includes(user?.student?.id || '')

  const isTeacherMember = (group: IDisciplineGroup) =>
    group.teacherId === user?.teacher?.id

  const disciplineWithGroups = useMemo(() => {
    return disciplines.data?.filter(
      discipline =>
        discipline.groups?.filter(group => {
          const isMember = isStudentMember(group) || isTeacherMember(group)
          return isMember
        }).length,
    )
  }, [disciplines.data])

  const renderSearchGroupsItem = ({ item }: { item: IDiscipline }) => {
    return (
      <SearchSubscribedGroupsItem
        discipline={item}
        onDisciplineGroupPress={onDisciplineGroupSelected}
      />
    )
  }

  return (
    <SearchLayout
      search={code}
      searchPlaceholder="Digite o código da disciplina"
      onSearchChange={onCodeChange}
    >
      <SearchList
        isFetchingMore={disciplines.isFetchingMore}
        isRefreshing={disciplines.isRefreshing}
        data={disciplineWithGroups}
        renderItem={renderSearchGroupsItem}
        onNextPage={disciplines.onNextPage}
        onRefresh={disciplines.onRefresh}
      />
    </SearchLayout>
  )
}

export default withSearchSubscribedGroupsPresenter(SearchSubscribedGroupsScreen)
