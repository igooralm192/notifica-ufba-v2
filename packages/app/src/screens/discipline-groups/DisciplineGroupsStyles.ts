import { Text } from '@rneui/themed'
import { TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.grey1};
  
`

export const Title = styled(Text)`
  font-family: 'Poppins_600SemiBold';
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white};
  letter-spacing: -1px;
`

export const Subtitle = styled(Text)`
  font-family: 'Poppins_400Regular';
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white + 'CC'};
  margin-top: -4px;
`


export const HeaderButton = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  background-color: transparent;
  border-radius: 8px;
`

export const ListContainer = styled(Animated.View)`
  flex: 1;
`
