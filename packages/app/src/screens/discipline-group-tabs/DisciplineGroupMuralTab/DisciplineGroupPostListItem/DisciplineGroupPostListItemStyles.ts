import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.Pressable`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.grey2};
`

export const TopContainer = styled.View`
  flex-direction: row;
`
export const BottomContainer = styled.View``

export const AuthorName = styled(Text)`
  font-family: 'Quicksand_700Bold';
  font-size: 16px;
  line-height: 18px;
`

export const CreatedAt = styled(Text)`
  font-family: 'Quicksand_400Regular';
  line-height: 14px;
  font-size: 12px;
`
export const ContentBody = styled(Text)`
  font-family: 'Quicksand_500Medium';
  font-size: 14px;
`
