import UserSVG from '@/assets/user.svg'
import { Layout } from '@/components/Layout'
import { Stack } from '@/components/Stack'

import { Icon, Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled(Layout)``

export const UserContainer = styled.View`
  padding: 24px;
  align-items: center;
`

export const PhotoContainer = styled.View`
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  background-color: #ebffde;
  overflow: hidden;
`

export const PhotoEditContainer = styled.View`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 32px;
  height: 32px;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const Photo = styled.Image`
  width: 100%;
  height: 100%;
`
export const UserName = styled(Text)`
  font-family: 'Quicksand_700Bold';
  font-size: 24px;
`

export const UserImagePlaceholder = styled(UserSVG)``

export const OptionsContainer = styled.View``

export const OptionContainer = styled(Stack).attrs({ d: 'horizontal' })`
  margin: 0 24px;
  width: 100%;
  align-items: center;
`

export const OptionIcon = styled(Icon).attrs({
  containerStyle: {
    backgroundColor: '#E9E9E9',
    padding: 12,
    borderRadius: 12,
  },
})``
export const OptionName = styled(Text)`
  font-family: 'Quicksand_600SemiBold';
  font-size: 16px;
`
