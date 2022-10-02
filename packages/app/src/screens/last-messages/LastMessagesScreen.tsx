
import { ILastMessageDTO } from '@shared/dtos'
import { useStatusBar } from '@/contexts/status-bar'

import { Divider } from '@rneui/themed'
import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList } from 'react-native'

import {
  useLastMessagesPresenter,
  withLastMessagesPresenter,
} from './LastMessagesPresenter'
import { LastMessageListItem } from './LastMessageListItem'
import { Container } from './LastMessagesStyles'

export interface LastMessagesScreenProps {}

const LastMessagesScreen: React.FC<LastMessagesScreenProps> = () => {
  const { loading, lastMessages } = useLastMessagesPresenter()

  const renderLastMessageListItem = ({ item }: { item: ILastMessageDTO }) => {
    return <LastMessageListItem key={item.disciplineGroupCode} message={item} />
  }

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Mensagens', back: false }}>
      <FlatList
        data={lastMessages.results}
        renderItem={renderLastMessageListItem}
        ItemSeparatorComponent={Divider}
      />

      {/* <Button title={'Logout'} onPress={() => auth.logout()} /> */}
    </Container>
  )
}

export default withLastMessagesPresenter(LastMessagesScreen)
