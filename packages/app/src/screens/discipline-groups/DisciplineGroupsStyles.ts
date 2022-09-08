import { Layout } from '@/components/Layout'
import styled from 'styled-components/native'

export const Container = styled(Layout)``

export const ListContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.grey1};
`
