import { ILastMessageDTO } from '@notifica-ufba/domain/usecases'

import { useNavigation } from '@/helpers'

import { ListItem } from '@rneui/themed'
import { formatDistanceToNow } from 'date-fns'
import LocalePTBR from 'date-fns/locale/pt-BR'
import React from 'react'

import {
  Container,
  DisciplineDetailsContainer,
  DisciplineTimestampContainer,
  DisciplineName,
  DisciplineMessage,
  DisciplineMessageTime,
} from './LastMessageListItemStyles'

export interface LastMessageListItemProps {
  message: ILastMessageDTO
}

const LastMessageListItem: React.FC<LastMessageListItemProps> = ({
  message,
}) => {
  const navigation = useNavigation()

  return (
    <ListItem
      containerStyle={{ paddingHorizontal: 16 }}
      onPress={() =>
        navigation.navigate('DisciplineGroupTabsScreen', {
          disciplineGroupId: message.disciplineGroupId,
          initialTab: 'chat',
        })
      }
    >
      <ListItem.Content>
        <Container>
          <DisciplineDetailsContainer>
            <DisciplineName>{message.disciplineName}</DisciplineName>
            <DisciplineMessage numberOfLines={2}>
              {message.message}
            </DisciplineMessage>
          </DisciplineDetailsContainer>

          <DisciplineTimestampContainer>
            <DisciplineMessageTime>
              {formatDistanceToNow(message.sentAt, {
                locale: LocalePTBR,
              })}
            </DisciplineMessageTime>
          </DisciplineTimestampContainer>
        </Container>
      </ListItem.Content>
    </ListItem>
  )
}

export default LastMessageListItem
