import { IDisciplineGroupPost } from '@shared/entities'

import { BottomSheet } from '@/components/BottomSheet'
import { ConfirmationModal } from '@/components/ConfirmationModal'
import { LoadingModal } from '@/components/LoadingModal'
import { Spacer } from '@/components/Spacer'
import { useBoolean } from '@/hooks/common'

import { Icon, Text } from '@rneui/themed'
import { format } from 'date-fns'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { useDisciplineGroupMuralPresenter } from '../DisciplineGroupMuralPresenter'
import {
  Container,
  TopContainer,
  BottomContainer,
  AuthorName,
  CreatedAt,
  ContentBody,
} from './DisciplineGroupPostListItemStyles'
import UserProfilePicture from '@/components/UserProfilePicture'
import { useMe } from '@/contexts/me'
import { delay } from '@/utils/delay'

export interface DisciplineGroupPostListItemProps {
  disciplineGroupPost: IDisciplineGroupPost
}

const DisciplineGroupPostListItem: React.FC<
  DisciplineGroupPostListItemProps
> = ({ disciplineGroupPost }) => {
  const { deletePost } = useDisciplineGroupMuralPresenter()

  const {user} = useMe()

  const bottomMenuVisible = useBoolean()
  const deletePostConfirmVisible = useBoolean()

  const createdAt = format(disciplineGroupPost.createdAt, 'dd/MM/yyyy HH:mm')

  const handleDeleteDisciplineGroupPost = async () => {
    deletePostConfirmVisible.off()
    await delay(400)
    await deletePost.delete(disciplineGroupPost.id)
  }

  return (
    <Container>
      <TopContainer>
        {disciplineGroupPost.authorId && (
          <>
            <UserProfilePicture
              userId={disciplineGroupPost.authorId}
              pictureProps={{ size: 32 }}
            />

            <Spacer d="horizontal" s={4} />
          </>
        )}

        <View style={{ flex: 1 }}>
          <AuthorName>{disciplineGroupPost.author?.name}</AuthorName>
          <CreatedAt>{createdAt}</CreatedAt>
        </View>

        <Spacer d="horizontal" s={4} />

        {user.type === 'TEACHER' && (
          <TouchableOpacity
            hitSlop={{ top: 24, left: 24, right: 24, bottom: 24 }}
            onPress={bottomMenuVisible.on}
          >
            <Icon name="more-vert" />
          </TouchableOpacity>
        )}
      </TopContainer>
      <Spacer />

      <BottomContainer>
        <ContentBody>{disciplineGroupPost.content}</ContentBody>
      </BottomContainer>

      <BottomSheet
        visible={bottomMenuVisible.value}
        onHide={bottomMenuVisible.off}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={deletePostConfirmVisible.on}
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
            Remover postagem
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

        <ConfirmationModal
          visible={deletePostConfirmVisible.value}
          title="Remover postagem"
          body="Você tem certeza que deseja remover esta postagem?"
          onConfirm={handleDeleteDisciplineGroupPost}
          onBack={deletePostConfirmVisible.off}
        />

        <LoadingModal
          visible={deletePost.loading}
          description="Removendo postagem..."
        />
      </BottomSheet>
    </Container>
  )
}

export default DisciplineGroupPostListItem
