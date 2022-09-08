import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.Pressable`
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
`

export const LeftContainer = styled.View``
export const LeftTopContainer = styled.View``
export const LeftBottomContainer = styled.View``
export const RightContainer = styled.View``

export const DisciplineCode = styled(Text)`
  font-family: 'Quicksand_700Bold';
  font-size: 18px;
  line-height: 22px;
`
export const DisciplineName = styled(Text)`
  font-family: 'Quicksand_500Medium';
  font-size: 14px;
`

export const DisciplineGroupCode = styled(Text)`
  font-family: 'Quicksand_700Bold';
  font-size: 14px;
`
export const DisciplineGroupTeacher = styled(Text)`
  font-family: 'Quicksand_400Regular';
  font-size: 12px;
`
