import api from '@/api'
import { FooterLoading } from '@/components/FooterLoading'
import { Spacer } from '@/components/Spacer'
import { useMe } from '@/contexts/me'

import { Button } from '@rneui/themed'
import React, { useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  SendContainer,
  SendInputContainer,
  SendInput,
  SendButtonContainer,
} from './DisciplineGroupChatStyles'
import { DisciplineGroupMessageListItem } from './DisciplineGroupMessageListItem'
import {
  useDisciplineGroupChatPresenter,
  withDisciplineGroupChatPresenter,
} from './DisciplineGroupChatPresenter'
import { useDisciplineGroupTabsPresenter } from '../DisciplineGroupTabsPresenter'

const DisciplineGroupChatTab: React.FC = () => {
  const insets = useSafeAreaInsets()

  const { user } = useMe()
  const { disciplineGroup } = useDisciplineGroupTabsPresenter()
  const { isFetchingMore, disciplineGroupMessages, onNextPage } =
    useDisciplineGroupChatPresenter()

  const [message, setMessage] = useState('')

  const handleSendMessage = () => {
    const formattedMessage = message.trim()

    if (formattedMessage.length == 0) {
      setMessage(formattedMessage)
      return 
    }

    api.disciplineGroup.createMessage(
      {
        disciplineGroupId: disciplineGroup.id,
        userId: user!.id,
        userName: user!.name,
      },
      {
        message: formattedMessage,
      },
    )

    setMessage('')


  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={120}
    >
      <FlatList
        data={disciplineGroupMessages}
        renderItem={({ item }) => (
          <DisciplineGroupMessageListItem
            key={item.id}
            disciplineGroupMessage={item}
          />
        )}
        ItemSeparatorComponent={Spacer}
        contentContainerStyle={{ padding: 16, paddingHorizontal: 4 }}
        onEndReached={onNextPage}
        onEndReachedThreshold={0.15}
        ListFooterComponent={isFetchingMore ? FooterLoading : undefined}
        inverted
      />
      <SendContainer style={{ paddingBottom: insets.bottom - 16 }}>
        <SendInputContainer>
          <SendInput
            placeholder="Envie uma mensagem"
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={handleSendMessage}
          />
        </SendInputContainer>

        <Spacer d="horizontal" />

        <SendButtonContainer>
          <Button
            buttonStyle={{ width: 50, height: 50, borderRadius: 25 }}
            icon={{ name: 'send', color: 'white', size: 24 }}
            color="primary"
            size="sm"
            onPress={handleSendMessage}
          />
        </SendButtonContainer>
      </SendContainer>
    </KeyboardAvoidingView>
  )
}

export default withDisciplineGroupChatPresenter(DisciplineGroupChatTab)
