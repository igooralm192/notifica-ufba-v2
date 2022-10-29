import LogoSVG from '@/assets/logo.svg'
import { Form } from '@/components/Form'

import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled(Form)``

export const Logo = styled(LogoSVG)`
  align-self: center;
  margin: 16px 0 32px;
`

export const ForgotPasswordText = styled(Text)`
  margin: 16px 0 48px;
  font-family: 'Quicksand_400Regular';
  font-size: 16px;
  text-align: center;
`

export const InputContainer = styled.View`
  margin-bottom: 16px;
`

export const ButtonContainer = styled.View`
  margin-top: 16px;
`
