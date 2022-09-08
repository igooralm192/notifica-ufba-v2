import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'

import { useStatusBar } from '@/contexts/status-bar'

import { Divider } from '@rneui/themed'
import React, { useEffect, useLayoutEffect } from 'react'
import { FlatList, View } from 'react-native'

import {
  useDisciplineGroupMessagesPresenter,
  withDisciplineGroupMessagesPresenter,
} from './DisciplineGroupMessagesPresenter'
import { DisciplineGroupMessagesListItem } from './DisciplineGroupMessagesListItem'
import { Container } from './DisciplineGroupMessagesStyles'
import { IDisciplineGroupMessage } from '@shared/entities'

export interface DisciplineGroupMessagesScreenProps {}

const DisciplineGroupMessagesScreen: React.FC<
  DisciplineGroupMessagesScreenProps
> = () => {
  const presenter = useDisciplineGroupMessagesPresenter()

  const statusBar = useStatusBar()

  const renderDisciplineGroupMessagesListItem = ({
    item,
  }: {
    item: IDisciplineGroupMessage
  }) => {
    return (
      <DisciplineGroupMessagesListItem
        key={item.id}
        disciplineGroupMessage={item}
      />
    )
  }

  useLayoutEffect(() => {
    statusBar.setTheme('primary')
  }, [])

  return (
    <Container>
      <FlatList
        inverted
        data={presenter.disciplineGroupMessages.results}
        renderItem={renderDisciplineGroupMessagesListItem}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
        contentContainerStyle={{ paddingTop: 16 }}
      />
    </Container>
  )
}

export default withDisciplineGroupMessagesPresenter(
  DisciplineGroupMessagesScreen,
)
