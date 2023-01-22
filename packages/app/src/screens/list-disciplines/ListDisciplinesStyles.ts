import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import styled from 'styled-components/native'

export const Container = styled(Layout)``

export const InputContainer = styled.Pressable`
  margin: 8px 0px 16px;
`

export const ListDisciplinesInput = styled(Input).attrs({
  inputContainerStyle: {
    minHeight: 40,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
})``

export const ButtonContainer = styled.View`
  width: 100%;
  margin: 16px 0;
  padding: 0 24px;
`

export const ListDisciplinesButton = styled(Button)``
