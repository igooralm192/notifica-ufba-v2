import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'

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
  const presenter = useLastMessagesPresenter()

  const statusBar = useStatusBar()

  const renderLastMessageListItem = ({ item }: { item: ILastMessageDTO }) => {
    return <LastMessageListItem key={item.disciplineGroupCode} message={item} />
  }

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  useEffect(() => {
    presenter.getLastMessages()
  }, [])

  return (
    <Container headerProps={{ title: 'Mensagens', back: false }}>
      <FlatList
        data={presenter.lastMessages.results}
        renderItem={renderLastMessageListItem}
        ItemSeparatorComponent={Divider}
      />

      {/* <Button title={'Logout'} onPress={() => auth.logout()} /> */}
    </Container>
  )
}

export default withLastMessagesPresenter(LastMessagesScreen)
