import { IDisciplineGroupPost } from '@shared/entities'

import { Spacer } from '@/components/Spacer'

import { Avatar, Icon, useTheme } from '@rneui/themed'
import { format } from 'date-fns'
import React from 'react'
import { View } from 'react-native'

import {
  Container,
  TopContainer,
  BottomContainer,
  AuthorName,
  CreatedAt,
  ContentBody,
} from './DisciplineGroupPostListItemStyles'

export interface DisciplineGroupPostListItemProps {
  disciplineGroupPost: IDisciplineGroupPost
}

const DisciplineGroupPostListItem: React.FC<
  DisciplineGroupPostListItemProps
> = ({ disciplineGroupPost }) => {
  const { theme } = useTheme()

  const createdAt = format(disciplineGroupPost.createdAt, 'dd/MM/yyyy HH:mm')

  return (
    <Container>
      <TopContainer>
        <Avatar
          size={32}
          rounded
          icon={{ name: 'user', type: 'font-awesome' }}
          containerStyle={{ backgroundColor: theme.colors.primary }}
        />

        <Spacer d="horizontal" s={4} />

        <View style={{ flex: 1 }}>
          <AuthorName>{disciplineGroupPost.author?.name}</AuthorName>
          <CreatedAt>{createdAt}</CreatedAt>
        </View>

        <Spacer d="horizontal" s={4} />

        <Icon name="more-vert" />
      </TopContainer>

      <Spacer />

      <BottomContainer>
        <ContentBody>{disciplineGroupPost.content}</ContentBody>
      </BottomContainer>
    </Container>
  )
}

export default DisciplineGroupPostListItem
