import { IDisciplineGroupMessage } from '@shared/entities'

import api from '@/api'
import { BottomSheet } from '@/components/BottomSheet'
import { Spacer } from '@/components/Spacer'
import { Stack } from '@/components/Stack'
import UserProfilePicture from '@/components/UserProfilePicture'
import { useBoolean } from '@/hooks/common'
import { useMe } from '@/contexts/me'

import { Icon, Text } from '@rneui/themed'
import { format } from 'date-fns'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import {
  ReceivedContainer,
  ReceivedMessageContainer,
  ReceivedSentBy,
  ReceivedMessage,
  SentContainer,
  SentMessageContainer,
  SentMessage,
  SentAt,
} from './DisciplineGroupMessageListItemStyles'

export interface DisciplineGroupMessageListItemProps {
  disciplineGroupMessage: IDisciplineGroupMessage
}

const DisciplineGroupMessageListItem: React.FC<
  DisciplineGroupMessageListItemProps
> = ({ disciplineGroupMessage }) => {
  const { user } = useMe()

  const bottomMenuVisible = useBoolean()

  const wasSentByMe = user?.id === disciplineGroupMessage.sentById
  const sentAt = format(disciplineGroupMessage.sentAt, 'dd/MM/yyyy HH:mm')

  const handleDeleteMessage = async () => {
    bottomMenuVisible.off()

    await api.disciplineGroup.deleteMessage({
      disciplineGroupId: disciplineGroupMessage.disciplineGroupId,
      messageId: disciplineGroupMessage.id,
    })
  }

  const renderReicevedMessage = () => {
    return (
      <ReceivedContainer>
        <View style={{ flexDirection: 'row' }}>
          <UserProfilePicture
            userId={disciplineGroupMessage.sentById}
            pictureProps={{ size: 28 }}
          />

          <Spacer d="horizontal" s={4} />

          <View>
            <ReceivedMessageContainer>
              <ReceivedSentBy>{disciplineGroupMessage.sentBy}</ReceivedSentBy>
              <ReceivedMessage>{disciplineGroupMessage.body}</ReceivedMessage>
            </ReceivedMessageContainer>
            <SentAt>{sentAt}</SentAt>
          </View>
        </View>
      </ReceivedContainer>
    )
  }

  const renderSentMessage = () => {
    return (
      <TouchableOpacity activeOpacity={0.8} onLongPress={bottomMenuVisible.on}>
        <SentContainer>
          <SentMessageContainer>
            <SentMessage>{disciplineGroupMessage.body}</SentMessage>
          </SentMessageContainer>
          <SentAt>{sentAt}</SentAt>
        </SentContainer>
      </TouchableOpacity>
    )
  }

  return (
    <>
      {wasSentByMe ? renderSentMessage() : renderReicevedMessage()}
      <BottomSheet
        visible={bottomMenuVisible.value}
        onHide={bottomMenuVisible.off}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleDeleteMessage}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <Icon name="delete-outline" color="red" size={22} />

          <Text
            style={{
              justifyContent: 'center',
              marginLeft: 8,
              color: 'red',
              fontFamily: 'Inter_600SemiBold',
            }}
          >
            Remover mensagem
          </Text>
        </TouchableOpacity>

        <Spacer />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
          }}
          activeOpacity={0.5}
          onPress={bottomMenuVisible.off}
        >
          <Text
            style={{
              justifyContent: 'center',
              fontFamily: 'Inter_600SemiBold',
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </BottomSheet>
    </>
  )
}

export default DisciplineGroupMessageListItem
