import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'

import { useTheme } from '@rneui/themed'
import React from 'react'
import { FlatList } from 'react-native'

import { DisciplineGroupMessageListItem } from './DisciplineGroupMessageListItem'
import {
  useDisciplineGroupChatPresenter,
  withDisciplineGroupChatPresenter,
} from './DisciplineGroupChatPresenter'

export interface DisciplineGroupChatTabProps {}

const DisciplineGroupChatTab: React.FC<DisciplineGroupChatTabProps> = props => {
  const { theme } = useTheme()

  const { isFetchingMore, disciplineGroupMessages, onNextPage } =
    useDisciplineGroupChatPresenter()

  return (
    <FlatList
      style={{ backgroundColor: theme.colors.grey1 }}
      data={disciplineGroupMessages}
      renderItem={({ item }) => (
        <DisciplineGroupMessageListItem
          key={item.id}
          disciplineGroupMessage={item}
        />
      )}
      ItemSeparatorComponent={Spacer}
      contentContainerStyle={{ padding: 16 }}
      onEndReached={onNextPage}
      onEndReachedThreshold={0.15}
      ListFooterComponent={isFetchingMore ? FooterLoading : undefined}
      inverted
    />
  )
}

export default withDisciplineGroupChatPresenter(DisciplineGroupChatTab)
