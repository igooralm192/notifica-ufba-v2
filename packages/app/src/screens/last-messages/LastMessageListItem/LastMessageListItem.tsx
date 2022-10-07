import { useNavigation } from '@/helpers'

import { ListItem } from '@rneui/themed'
import { ILastMessageDTO } from '@shared/dtos'
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
  lastMessage: ILastMessageDTO
}

const LastMessageListItem: React.FC<LastMessageListItemProps> = ({
  lastMessage,
}) => {
  const navigation = useNavigation()

  const { message, disciplineName, sentBy, sentAt } = lastMessage

  console.log({lastMessage})

  return (
    <ListItem
      containerStyle={{ paddingHorizontal: 16 }}
      onPress={() =>
        navigation.navigate('DisciplineGroupTabsScreen', {
          disciplineGroupId: lastMessage.disciplineGroupId,
          initialTab: 'chat',
        })
      }
    >
      <ListItem.Content>
        <Container>
          <DisciplineDetailsContainer>
            <DisciplineName>{disciplineName}</DisciplineName>

            <DisciplineMessage numberOfLines={2}>
              {message ?? 'Não há mensagens para esta turma'}
            </DisciplineMessage>
          </DisciplineDetailsContainer>

          <DisciplineTimestampContainer>
            {!!sentAt && (
              <DisciplineMessageTime>
                {formatDistanceToNow(sentAt, {
                  locale: LocalePTBR,
                })}
              </DisciplineMessageTime>
            )}
          </DisciplineTimestampContainer>
        </Container>
      </ListItem.Content>
    </ListItem>
  )
}

export default LastMessageListItem
