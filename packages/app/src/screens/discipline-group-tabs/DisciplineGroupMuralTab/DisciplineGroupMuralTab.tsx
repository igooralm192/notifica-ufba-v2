import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'

import { useTheme } from '@rneui/themed'
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'

import { DisciplineGroupPostListItem } from './DisciplineGroupPostListItem'
import {
  useDisciplineGroupMuralPresenter,
  withDisciplineGroupMuralPresenter,
} from './DisciplineGroupMuralPresenter'

export interface DisciplineGroupMuralTabProps {}

const DisciplineGroupMuralTab: React.FC<DisciplineGroupMuralTabProps> = () => {
  const { theme } = useTheme()

  const {
    isFetchingMore,
    isRefreshing,
    disciplineGroupPosts,
    onNextPage,
    onRefresh,
  } = useDisciplineGroupMuralPresenter()

  return (
    <FlatList
      style={{ backgroundColor: theme.colors.grey1 }}
      data={disciplineGroupPosts}
      renderItem={({ item }) => (
        <DisciplineGroupPostListItem disciplineGroupPost={item} />
      )}
      ItemSeparatorComponent={Spacer}
      contentContainerStyle={{ padding: 16 }}
      onEndReached={onNextPage}
      onEndReachedThreshold={0.15}
      ListFooterComponent={isFetchingMore ? FooterLoading : undefined}
      refreshControl={
        <RefreshControl
          refreshing={!isFetchingMore && isRefreshing}
          onRefresh={onRefresh}
        />
      }
    />
  )
}

export default withDisciplineGroupMuralPresenter(DisciplineGroupMuralTab)
