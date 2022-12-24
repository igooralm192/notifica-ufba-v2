import { Spacer } from '@/components/Spacer'
import { useStatusBar } from '@/contexts/status-bar'
import { useNavigation } from '@/helpers'

import { Image } from '@rneui/themed'
import React from 'react'

import { useProfilePresenter, withProfilePresenter } from './ProfilePresenter'
import {
  Container,
  UserContainer,
  PhotoContainer,
  Photo,
  UserImagePlaceholder,
  UserName,
  OptionContainer,
  OptionIcon,
  OptionName,
} from './ProfileStyles'

export interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const { user, logout } = useProfilePresenter()

  const navigation = useNavigation()

  useStatusBar('primary')

  return (
    <Container headerProps={{ title: 'Perfil', back: false }}>
      <UserContainer>
        <PhotoContainer>
          {/* <Photo
            source={{
              width: 100,
              height: 100,
              uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            }}
            resizeMode="cover"
          /> */}
          <UserImagePlaceholder />
        </PhotoContainer>

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

      <OptionContainer onPress={logout}>
        <OptionIcon name="logout" />
        <OptionName>Sair</OptionName>
      </OptionContainer>
    </Container>
  )
}

export default withProfilePresenter(ProfileScreen)
