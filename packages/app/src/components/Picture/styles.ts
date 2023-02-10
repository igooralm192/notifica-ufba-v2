import UserSVG from '@/assets/user.svg'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const Container = styled.View`
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: #ebffde;
  overflow: hidden;
`

export const PictureImage = styled(Animated.Image)`
  width: 100%;
  height: 100%;
`

export const PictureImagePlaceholder = styled(UserSVG)``
