import { Button } from '@/components/Button'
import { Layout } from '@/components/Layout'
import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled(Layout)``

export const TopContainer = styled.View`
  padding: 0px 16px 8px;
  background-color: ${({ theme }) => theme.colors.primary};
`

export const BottomContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
})`
  margin-top: -32px;
  padding-top: 8px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: white;
`

export const DisciplineGroupContainer = styled.View`
  padding-bottom: 48px;
  flex-direction: row;
  justify-content: space-between;
`
export const DisciplineContainer = styled.View`
  flex: 1;
`
export const GroupContainer = styled.View`
  align-items: flex-end;
  justify-content: flex-end;
`

export const DisciplineName = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 22px;
  font-family: 'Quicksand_700Bold';
`

export const DisciplineCode = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-family: 'Montserrat_400Regular';
`

export const GroupCode = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-family: 'Montserrat_400Regular';
`

export const GroupTeacher = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  font-family: 'Quicksand_600SemiBold';
`

export const SectionContainer = styled.View`
  margin-bottom: 16px;
`

export const SectionLabel = styled(Text)`
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.grey3};
  font-family: 'Quicksand_700Bold';
  font-size: 12px;
`

export const SectionText = styled(Text)`
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Quicksand_500Medium';
  font-size: 14px;
  line-height: 14px;
`

export const DescriptionContainer = styled(SectionContainer)``
export const MenuContainer = styled(SectionContainer)``
export const MembersContainer = styled(SectionContainer)``

export const DescriptionLabel = styled(SectionLabel)``
export const MenuLabel = styled(SectionLabel)``
export const MembersLabel = styled(SectionLabel)``

export const Description = styled(SectionText)``
export const MenuUrl = styled(SectionText)``

export const MembersPictureContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

export const MembersRemaining = styled(Text)`
  color: ${({ theme }) => theme.colors.black};
  font-size: 10px;
  font-family: 'Montserrat_400Regular';
  margin-left: 8px;
`

export const ButtonContainer = styled.View`
  width: 100%;
  margin: 16px 0;
  padding: 0 24px;
`

export const SubscribeButton = styled(Button).attrs({
  titleStyle: { fontFamily: 'Quicksand_600SemiBold' },
  buttonStyle: { padding: 12 },
})``

export const UnsubscribeButton = styled(Button).attrs({
  titleStyle: { fontFamily: 'Quicksand_600SemiBold' },
  buttonStyle: { padding: 12 },
})``
