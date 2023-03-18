import { IDiscipline } from '@shared/entities'
import { SearchLayout } from '@/components/SearchLayout'
import { SearchList } from '@/components/SearchList'
import React from 'react'

import { SearchDisciplinesItem } from './SearchDisciplinesItem'
import {
  useSearchDisciplinesPresenter,
  withSearchDisciplinesPresenter,
} from './SearchDisciplinesPresenter'

const SearchDisciplinesScreen: React.FC = () => {
  const { disciplines, code, onCodeChange, onDisciplineSelected } =
    useSearchDisciplinesPresenter()

  const renderSearchDisciplinesItem = ({ item }: { item: IDiscipline }) => {
    return (
      <SearchDisciplinesItem
        discipline={item}
        onDisciplinePress={onDisciplineSelected}
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
        renderItem={renderSearchDisciplinesItem}
        onNextPage={disciplines.onNextPage}
        onRefresh={disciplines.onRefresh}
      />
    </SearchLayout>
  )
}

export default withSearchDisciplinesPresenter(SearchDisciplinesScreen)
