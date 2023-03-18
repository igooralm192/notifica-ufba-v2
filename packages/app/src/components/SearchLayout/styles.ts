import { Input } from '@/components/Input'
import { Layout } from '@/components/Layout'
import styled from 'styled-components/native'

export const Container = styled(Layout)``

export const InputContainer = styled.Pressable`
  margin: 8px 0px 16px;
`

export const SearchInput = styled(Input).attrs({
  inputContainerStyle: {
    minHeight: 40,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
})``
