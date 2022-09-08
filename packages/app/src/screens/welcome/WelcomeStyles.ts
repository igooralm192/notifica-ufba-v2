import { Button } from '@/components/Button'

import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
})``

export const Title = styled(Text)`
  margin-bottom: 32px;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Quicksand_700Bold';
  font-size: 36px;
  text-align: center;
`
export const Subtitle = styled(Text)`
  font-family: 'Quicksand_400Regular';
  font-size: 16px;
  text-align: center;
`

export const ImageContainer = styled.View`
  margin: 64px 0;
  align-items: center;
`

export const WelcomeImage = styled.Image`
  width: 314px;
  height: 300px;
  border-radius: 150px;
`

export const ButtonsContainer = styled.View``
export const ButtonContainer = styled.View`
  margin-bottom: 16px;
`
export const LoginButton = styled(Button).attrs({ type: 'outline' })``
export const RegisterButton = styled(Button)``
