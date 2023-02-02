import { Text } from '@rneui/themed'
import { TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: #f5f9f1;
  padding: 8px 16px 0;
`

export const Title = styled(Text)`
  font-family: 'Poppins_600SemiBold';
  font-size: 24px;
  color: ${({ theme }) => theme.colors.secondary};
  letter-spacing: -1px;
`

export const Subtitle = styled(Text)`
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
  margin-top: -4px;
`


export const HeaderButton = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`

export const ListContainer = styled(Animated.View)`
  flex: 1;
  margin: 0 -16px;
`
