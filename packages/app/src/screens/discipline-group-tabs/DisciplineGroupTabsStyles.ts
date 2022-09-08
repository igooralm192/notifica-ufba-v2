import { Button } from '@/components/Button'
import { Layout } from '@/components/Layout'
import { Text } from '@rneui/themed'
import styled from 'styled-components/native'

export const Container = styled(Layout)``

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
})``

export const InitialLetterContainer = styled.View`
  width: 96px;
  height: 96px;
  margin-top: 16px;
  border-radius: 48px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: #dfdeff;
`
export const InitialLetter = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Quicksand_700Bold';
  font-size: 36px;
  line-height: 42px;
`

export const TitleContainer = styled.View`
  align-self: center;
  margin-bottom: 32px;
`

export const DisciplineCode = styled(Text)`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Quicksand_700Bold';
  font-size: 24px;
  text-align: center;
  line-height: 28px;
`

export const Name = styled(Text)`
  color: ${({ theme }) => theme.colors.black};
  font-family: 'Quicksand_600SemiBold';
  font-size: 16px;
  text-align: center;
  line-height: 18px;
`

export const GroupCode = styled(Text)`
  color: ${({ theme }) => theme.colors.grey3};
  font-family: 'Quicksand_600SemiBold';
  font-size: 14px;
  text-align: center;
  line-height: 20px;
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
export const TeacherContainer = styled(SectionContainer)``
export const MenuContainer = styled(SectionContainer)``
export const ClassSchedulesContainer = styled(SectionContainer)``

export const DescriptionLabel = styled(SectionLabel)``
export const TeacherLabel = styled(SectionLabel)``
export const MenuLabel = styled(SectionLabel)``
export const ClassSchedulesLabel = styled(SectionLabel)``

export const Description = styled(SectionText)``
export const TeacherName = styled(SectionText)``
export const MenuUrl = styled(SectionText)``
export const ClassSchedule = styled(SectionText)``

export const ButtonContainer = styled.View`
  width: 100%;
  margin: 16px 0;
  padding: 0 24px;
`

export const SubscribeButton = styled(Button)``
