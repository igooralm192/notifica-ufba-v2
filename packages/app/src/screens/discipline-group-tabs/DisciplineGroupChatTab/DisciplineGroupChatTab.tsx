import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'

import React from 'react'
import { FlatList } from 'react-native'

import { DisciplineGroupMessageListItem } from './DisciplineGroupMessageListItem'
import {
  useDisciplineGroupChatPresenter,
  withDisciplineGroupChatPresenter,
} from './DisciplineGroupChatPresenter'

export interface DisciplineGroupChatTabProps {}

const DisciplineGroupChatTab: React.FC<DisciplineGroupChatTabProps> = props => {
  const { isFetchingMore, disciplineGroupMessages, onNextPage } =
    useDisciplineGroupChatPresenter()

  return (
    <FlatList
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
