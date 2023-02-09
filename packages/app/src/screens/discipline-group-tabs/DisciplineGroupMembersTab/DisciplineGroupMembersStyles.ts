import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const SectionTitle = styled(Text)`
  font-family: 'Poppins_600SemiBold';
  font-size: 18px;
  color: ${({theme}) => theme.colors.primary};
`

