import { Spacer } from '@/components/Spacer'
import { FooterLoading } from '@/components/FooterLoading'
import { useStatusBar } from '@/contexts/status-bar'

import React from 'react'
import { FlatList, RefreshControl } from 'react-native'

import { LastMessageListItem } from './LastMessageListItem'
import {
  useLastMessagesPresenter,
  withLastMessagesPresenter,
} from './LastMessagesPresenter'
import { Container, NoResultsText } from './LastMessagesStyles'

export interface LastMessagesScreenProps {}

const LastMessagesScreen: React.FC<LastMessagesScreenProps> = () => {
  const { isFetchingMore, isRefreshing, lastMessages, onNextPage, onRefresh } =
    useLastMessagesPresenter()

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Mensagens', back: false }}>
      <FlatList
        data={lastMessages}
        renderItem={({ item }) => (
          <LastMessageListItem
            key={item.disciplineGroupCode}
            lastMessage={item}
          />
        )}
        ListEmptyComponent={() => (
          <NoResultsText>Não há mensagens novas.</NoResultsText>
        )}
        ItemSeparatorComponent={Spacer}
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
    </Container>
  )
}

export default withLastMessagesPresenter(LastMessagesScreen)
