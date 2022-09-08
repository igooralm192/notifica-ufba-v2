import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled.View`
  padding-left: 16px;
  padding-right: 16px;
  flex-direction: row;
  align-items: center;
`

export const TitleContainer = styled.View`
  flex: 1;
`

export const Title = styled(Text)`
  font-family: 'Quicksand_700Bold';
  font-size: 18px;
  line-height: 24px;
`

export const Subtitle = styled(Text)`
  font-family: 'Quicksand_700Bold';
  font-size: 14px;
  line-height: 20px;
`

export const Action = styled.View``
