import { Button } from '@/components/Button'
import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const DisciplineGroupContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
export const DisciplineContainer = styled.View``
export const GroupContainer = styled.View`
  align-items: flex-end;
  justify-content: flex-end;
`

export const DisciplineName = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-family: 'Quicksand_700Bold';
`

export const DisciplineCode = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: 12px;
  font-family: 'Montserrat_400Regular';
`

export const GroupCode = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-family: 'Montserrat_400Regular';
`

export const GroupTeacher = styled.Text`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 12px;
  font-family: 'Quicksand_600SemiBold';
`

export const InfoContainer = styled.View``

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
`

export const SubscribeButton = styled(Button).attrs({
  titleStyle: { fontFamily: 'Quicksand_600SemiBold' },
  buttonStyle: { padding: 8, borderRadius: 12 },
})``
