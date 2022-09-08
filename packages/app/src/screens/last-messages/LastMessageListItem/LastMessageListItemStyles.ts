import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
`

export const DisciplineDetailsContainer = styled.View`
  flex-grow: 1;
  flex-shrink: 1;
`
export const DisciplineTimestampContainer = styled.View`
  margin-left: 24px;
  align-items: center;
  justify-content: space-between;
`

export const DisciplineName = styled(Text)`
  font-family: 'Quicksand_700Bold';
  font-size: 14px;
`

export const DisciplineMessage = styled(Text)`
  font-family: 'Quicksand_400Regular';
  font-size: 12px;
`

export const DisciplineMessageTime = styled(Text)``
export const DisciplineMessageBadge = styled.View`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`
