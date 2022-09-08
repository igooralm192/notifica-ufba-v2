import { IDisciplineGroupMessage } from '@shared/entities'

import { useMe } from '@/contexts/me'

import { format } from 'date-fns'
import React from 'react'

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

  const wasSentByMe = user?.id === disciplineGroupMessage.sentById

  const sentAt = format(disciplineGroupMessage.sentAt, 'dd/MM/yyyy HH:mm')

  const renderReicevedMessage = () => {
    return (
      <ReceivedContainer>
        <ReceivedMessageContainer>
          <ReceivedSentBy>{disciplineGroupMessage.sentBy}</ReceivedSentBy>
          <ReceivedMessage>{disciplineGroupMessage.body}</ReceivedMessage>
        </ReceivedMessageContainer>
        <SentAt>{sentAt}</SentAt>
      </ReceivedContainer>
    )
  }

  const renderSentMessage = () => {
    return (
      <SentContainer>
        <SentMessageContainer>
          <SentMessage>{disciplineGroupMessage.body}</SentMessage>
        </SentMessageContainer>
        <SentAt>{sentAt}</SentAt>
      </SentContainer>
    )
  }

  return wasSentByMe ? renderSentMessage() : renderReicevedMessage()
}

export default DisciplineGroupMessageListItem
