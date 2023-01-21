import ErrorFallbackSVG from '@/assets/error-fallback.svg'
import { Button } from '@/components/Button'

import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 32px;
`

export const ErrorImage = styled(ErrorFallbackSVG).attrs({
  width: 180,
  height: 180,
})`
  margin-bottom: 16px;
`

export const Title = styled.Text`
  margin-bottom: 24px;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Quicksand_700Bold';
  font-size: 24px;
  text-align: center;
`

export const Message = styled.Text`
  margin-bottom: 64px;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Quicksand_400Regular';
  font-size: 14px;
  text-align: center;
`

export const ButtonContainer = styled.View`
  width: 100%;
`

export const ResetButton = styled(Button)``
