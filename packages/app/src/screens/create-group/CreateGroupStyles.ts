import { Button } from '@/components/Button'
import DropdownInput from '@/components/DropdownInput'
import { Form } from '@/components/Form'
import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import styled from 'styled-components/native'

export const Container = styled(Layout)``

export const ScrollContainer = styled(Form).attrs({
  contentContainerStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
})``

export const InputContainer = styled.Pressable`
  margin-bottom: 16px;
`

export const CreateGroupInput = styled(Input).attrs({
  inputContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  labelStyle: {
    paddingVertical: 8,
  },
})``

export const CreateGroupDropdownInput = styled(DropdownInput).attrs({
  inputContainerStyle: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },

  labelStyle: {
    paddingVertical: 8,
  },
})``

export const ButtonContainer = styled.View`
  width: 100%;
  margin: 16px 0;
  padding: 0 24px;
`

export const CreateGroupButton = styled(Button)``
