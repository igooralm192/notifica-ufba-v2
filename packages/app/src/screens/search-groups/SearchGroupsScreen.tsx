import { IDiscipline } from '@shared/entities'
import { SearchLayout } from '@/components/SearchLayout'
import { SearchList } from '@/components/SearchList'
import React from 'react'

import { SearchGroupsItem } from './SearchGroupsItem'
import {
  useSearchGroupsPresenter,
  withSearchGroupsPresenter,
} from './SearchGroupsPresenter'

const SearchGroupsScreen: React.FC = () => {
  const { disciplines, code, onCodeChange, onDisciplineGroupSelected } =
    useSearchGroupsPresenter()

  const renderSearchGroupsItem = ({ item }: { item: IDiscipline }) => {
    return (
      <SearchGroupsItem
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
        data={disciplines.data}
        renderItem={renderSearchGroupsItem}
        onNextPage={disciplines.onNextPage}
        onRefresh={disciplines.onRefresh}
      />
    </SearchLayout>
  )
}

export default withSearchGroupsPresenter(SearchGroupsScreen)
