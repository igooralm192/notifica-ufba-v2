import { IDisciplineGroupMessage } from '@shared/entities'

import { useAuth } from '@/contexts/auth'

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
} from './DisciplineGroupMessagesListItemStyles'

export interface DisciplineGroupMessagesListItemProps {
  disciplineGroupMessage: IDisciplineGroupMessage
}

const DisciplineGroupMessagesListItem: React.FC<
  DisciplineGroupMessagesListItemProps
> = ({ disciplineGroupMessage }) => {
  const auth = useAuth()

  const wasSentByMe = auth.user?.id === disciplineGroupMessage.sentById

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

export default DisciplineGroupMessagesListItem
