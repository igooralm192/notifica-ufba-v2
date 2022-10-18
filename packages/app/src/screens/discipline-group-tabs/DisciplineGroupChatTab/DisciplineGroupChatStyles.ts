import { Input } from '@/components/Input'
import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.View``

export const Title = styled(Text)``

export const SendContainer = styled.View`
  width: 100%;
  /* height: 80px; */
  flex-direction: row;
  border: 0 solid ${({ theme }) => theme.colors.grey2};
  border-top-width: 1px;
  padding: 16px;
`

export const SendInputContainer = styled.View`
  flex: 1;
  height: 100%;
  /* background-color: ${({ theme }) => theme.colors.grey2}; */
  /* border-radius: 16px; */
`
export const SendButtonContainer = styled.View`
  width: auto;
  height: 100%;
`

export const SendInput = styled(Input).attrs({
  inputContainerStyle: {
    minHeight: 40,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
})``
