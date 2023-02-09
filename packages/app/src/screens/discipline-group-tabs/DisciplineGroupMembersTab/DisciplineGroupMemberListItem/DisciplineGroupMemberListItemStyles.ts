import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`

export const PictureContainer = styled.View``
export const Picture = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`

export const NameContainer = styled.View``
export const Name = styled(Text)`
  font-family: 'Poppins_400Regular';
  font-size: 14px;
`
