import { BottomSheet } from '@/components/BottomSheet'
import { Spacer } from '@/components/Spacer'
import { Stack } from '@/components/Stack'
import UserProfilePicture from '@/components/UserProfilePicture'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'
import { useBoolean } from '@/hooks/common'

import { Icon, useTheme } from '@rneui/themed'
import React, { useRef, useState } from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import { PreviewPictureModal } from './PreviewPictureModal'
import { useProfilePresenter, withProfilePresenter } from './ProfilePresenter'
import {
  Container,
  UserContainer,
  PhotoEditContainer,
  UserName,
  OptionContainer,
  OptionIcon,
  OptionName,
} from './ProfileStyles'

export interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const { user, logout, updateProfilePicture } = useProfilePresenter()
  const navigation = useNavigation()
  const { theme } = useTheme()

  const [previewPictureUri, setPreviewPictureUri] =
    useState<Nullable<string>>(null)

  const editPictureVisible = useBoolean()
  const previewPictureVisible = useBoolean()

  const cameraOrGalleryRef = useRef<'camera' | 'gallery'>()
  const editPictureModalCallback = useRef<(() => void)>()

  const pickImageFromCamera = async () => {
    cameraOrGalleryRef.current = 'camera'

    const cameraPermissionsResponse =
      await ImagePicker.requestCameraPermissionsAsync()

    if (!cameraPermissionsResponse.granted) return

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (result.cancelled) return

    setPreviewPictureUri(result.uri)

    editPictureVisible.off()

    editPictureModalCallback.current = () => {
      previewPictureVisible.on()
    }
  }

  const pickImageFromGallery = async () => {
    cameraOrGalleryRef.current = 'gallery'

    const galleryPermissionsResponse =
      await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!galleryPermissionsResponse.granted) return

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (result.cancelled) return

    setPreviewPictureUri(result.uri)

    editPictureVisible.off()

    editPictureModalCallback.current = () => {
      previewPictureVisible.on()
    }
  }

  const handleUpdatePicture = async () => {
    if (!previewPictureUri) return

    await updateProfilePicture.update(previewPictureUri)
    previewPictureVisible.off()
  }

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Perfil', back: false }}>
      <ScrollView>
        <UserContainer>
          <TouchableOpacity activeOpacity={0.6} onPress={editPictureVisible.on}>
            <UserProfilePicture userId={user.id} />

            <PhotoEditContainer>
              <Icon
                type="material-community"
                name="pencil-outline"
                color="white"
                size={16}
              />
            </PhotoEditContainer>
          </TouchableOpacity>

          <Spacer />

          <UserName>{user.name}</UserName>
        </UserContainer>

        <Spacer s={16} />

        <OptionContainer
          onPress={() =>
            navigation.navigate('EditProfileScreen', { userId: user.id })
          }
        >
          <OptionIcon name="edit" />
          <OptionName>Editar perfil</OptionName>
        </OptionContainer>

        <Spacer s={12} />

        <OptionContainer
          onPress={() =>
            navigation.navigate('SendFeedbackScreen')
          }
        >
          <OptionIcon name="send" />
          <OptionName>Enviar feedback</OptionName>
        </OptionContainer>

        <Spacer s={12} />

        <OptionContainer onPress={logout}>
          <OptionIcon name="logout" />
          <OptionName>Sair</OptionName>
        </OptionContainer>
      </ScrollView>

      <BottomSheet
        visible={editPictureVisible.value}
        onHide={editPictureVisible.off}
        onFinishHide={() => {
          editPictureModalCallback.current?.()
          editPictureModalCallback.current = undefined
        }}
      >
        <Stack s={8}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={pickImageFromCamera}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Icon
              type="material-community"
              name="camera"
              color={theme.colors.black}
              size={22}
            />

            <Text
              style={{
                justifyContent: 'center',
                marginLeft: 8,
                color: theme.colors.black,
                fontFamily: 'Inter_600SemiBold',
              }}
            >
              Tirar foto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={pickImageFromGallery}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Icon
              type="material-community"
              name="image"
              color={theme.colors.black}
              size={22}
            />

            <Text
              style={{
                justifyContent: 'center',
                marginLeft: 8,
                color: theme.colors.black,
                fontFamily: 'Inter_600SemiBold',
              }}
            >
              Abrir galeria
            </Text>
          </TouchableOpacity>
        </Stack>

        <Spacer />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
          }}
          activeOpacity={0.5}
          onPress={editPictureVisible.off}
        >
          <Text
            style={{
              justifyContent: 'center',
              fontFamily: 'Inter_600SemiBold',
              color: theme.colors.black,
            }}
          >
            Voltar
          </Text>
        </TouchableOpacity>
      </BottomSheet>

      <PreviewPictureModal
        pictureUri={previewPictureUri ?? undefined}
        loading={updateProfilePicture.loading}
        visible={previewPictureVisible.value}
        onHide={previewPictureVisible.off}
        onCancel={previewPictureVisible.off}
        onTakeAnother={
          cameraOrGalleryRef.current === 'camera'
            ? pickImageFromCamera
            : pickImageFromGallery
        }
        onUpdatePicture={handleUpdatePicture}
      />
    </Container>
  )
}

export default withProfilePresenter(ProfileScreen)
